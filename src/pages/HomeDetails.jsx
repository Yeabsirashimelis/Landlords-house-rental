"use client";

import { useQuery } from "@tanstack/react-query";
import DetailPhotos from "../features/details/DetailPhotos";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import { getHomeById } from "../services/HouseApi";
import OverView from "../features/details/OverView";
import WhatIsSpecial from "../features/details/WhatIsSpecial";
import FeaturesAndFacts from "../features/details/FeaturesAndFacts";
import Tour from "../features/details/Tour";
import { useRef, useState, useEffect } from "react";
import TourForm from "../features/details/TourForm";
import NeighBourhood from "../features/details/NeighBourhood";
import HomeLord from "../features/details/HomeLord";
import Footer from "../ui/Footer";
import { useAuth } from "../contexts/AuthContext";
import ShareBtns from "../features/Rent/ShareBtns";

export default function HomeDetails() {
  const [isTourFormOpened, setIsTourFormOpened] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const { id } = useParams();
  const {
    user: { id: myId },
  } = useAuth();

  const {
    data: home,
    isLoading: isLoadingHome,
    error: loadingHomeError,
  } = useQuery({
    queryKey: ["home", id],
    queryFn: () => getHomeById(id),
  });

  const isMyHome = myId === home?.userId;

  const oveRef = useRef();
  const featRef = useRef();
  const specRef = useRef();
  const neighRef = useRef();
  const lanRef = useRef();
  const detailPhotosRef = useRef();
  const navRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (detailPhotosRef.current) {
      observer.observe(detailPhotosRef.current);
    }

    return () => {
      if (detailPhotosRef.current) {
        observer.unobserve(detailPhotosRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
        }
      },
      { threshold: 0.3 }
    );

    const sections = [
      oveRef.current,
      featRef.current,
      specRef.current,
      neighRef.current,
      lanRef.current,
    ];
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  function scrollToSection(ref, section) {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(section);
    }
  }

  if (isLoadingHome) return <LoadingSpinner />;
  if (loadingHomeError) return <p>Error: {loadingHomeError.message}</p>;

  return (
    <div className="min-h-screen text-gray-700 bg-gray-50">
      <div ref={detailPhotosRef}>
        <DetailPhotos home={home} />
      </div>

      {isNavVisible && (
        <div
          ref={navRef}
          className="sticky top-0 z-20 invisible transition-all duration-300 border-b border-gray-200 shadow-lg sm:visible bg-white/95 backdrop-blur-md"
        >
          <nav className="flex justify-center h-16 max-w-4xl gap-1 px-4 mx-auto">
            {[
              { key: "overview", label: "Overview", ref: oveRef },
              { key: "features", label: "Features & Facts", ref: featRef },
              { key: "specials", label: "Specials & Policies", ref: specRef },
              { key: "neighborhood", label: "Neighborhood", ref: neighRef },
              { key: "landlord", label: "Landlord", ref: lanRef },
            ].map(({ key, label, ref }) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 ${
                  activeSection === key
                    ? "bg-green-100 text-green-700 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => scrollToSection(ref, key)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="relative flex flex-col gap-8 px-4 py-8 mx-auto lg:flex-row max-w-7xl">
        <div className="w-full lg:w-[70%] space-y-16">
          <div ref={oveRef} data-section="overview">
            <OverView home={home} />
          </div>

          <div
            ref={featRef}
            data-section="features"
            className="p-8 bg-white shadow-lg rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-600 shadow-lg rounded-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                FEATURES AND FACTS
              </h2>
            </div>
            <FeaturesAndFacts home={home} />
          </div>

          <div ref={specRef} data-section="specials">
            <WhatIsSpecial home={home} />
          </div>

          <div ref={neighRef} data-section="neighborhood">
            <NeighBourhood home={home} />
          </div>

          <div ref={lanRef} data-section="landlord">
            <HomeLord home={home} />
          </div>
        </div>

        <div className="w-full lg:w-[33%]">
          <div className="sticky space-y-6 top-24">
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <ShareBtns home={home} />
            </div>

            {!isMyHome && (
              <Tour home={home} setIsTourFormOpened={setIsTourFormOpened} />
            )}
          </div>
        </div>
      </div>

      {isTourFormOpened && (
        <TourForm home={home} setIsTourFormOpened={setIsTourFormOpened} />
      )}

      <Footer />
    </div>
  );
}
