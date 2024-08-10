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
import { is } from "date-fns/locale";
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
      { threshold: 0.3 } // Adjust the threshold if needed
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
    <div className="text-gray-700">
      <div ref={detailPhotosRef}>
        <DetailPhotos home={home} />
      </div>
      {isNavVisible && (
        <div
          ref={navRef}
          className="invisible sm:visible sticky top-0 z-20 shadow-lg bg-gray-100 transition-transform duration-300"
        >
          <nav className="flex gap-4 justify-center px-4 h-[50px]">
            <button
              className={`hover:text-blue-600 h-full ${
                activeSection === "overview"
                  ? "border-b-4 border-green-600"
                  : ""
              }`}
              onClick={() => scrollToSection(oveRef, "overview")}
            >
              OverView
            </button>
            <button
              className={`hover:text-blue-600  ${
                activeSection === "features"
                  ? "border-b-4 border-green-600"
                  : ""
              }`}
              onClick={() => scrollToSection(featRef, "features")}
            >
              Features and Facts
            </button>
            <button
              className={`hover:text-blue-600 ${
                activeSection === "specials"
                  ? "border-b-4 border-green-600"
                  : ""
              }`}
              onClick={() => scrollToSection(specRef, "specials")}
            >
              Specials and Policies
            </button>
            <button
              className={`hover:text-blue-600 ${
                activeSection === "neighborhood"
                  ? "border-b-4 border-green-600"
                  : ""
              }`}
              onClick={() => scrollToSection(neighRef, "neighborhood")}
            >
              Neighborhood
            </button>
            <button
              className={`hover:text-blue-600 ${
                activeSection === "landlord"
                  ? "border-b-4 border-green-600"
                  : ""
              }`}
              onClick={() => scrollToSection(lanRef, "landlord")}
            >
              Land Lord
            </button>
          </nav>
        </div>
      )}
      <div className="relative flex flex-col md:flex-row">
        <div className="w-full md:w-[70%]">
          <div ref={oveRef} data-section="overview">
            <OverView home={home} />
          </div>
          <div ref={featRef} data-section="features">
            <p className="text-xl font-bold mt-12 px-8">FEATURES AND FACTS</p>
            <FeaturesAndFacts home={home} />
          </div>
          <div ref={specRef} data-section="specials">
            <WhatIsSpecial home={home} />
          </div>
          <div ref={neighRef} data-section="neighborhood">
            <NeighBourhood home={home} />
          </div>
          <div ref={lanRef} data-section="landlord">
            <p className="text-xl font-bold mt-12 px-8">LAND LORD</p>
            <HomeLord home={home} />
          </div>
        </div>

        <div className="w-full md:w-[30%]">
          <div className="sticky-top">
            <ShareBtns home={home} />

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
