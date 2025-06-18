"use client";

import { motion, AnimatePresence } from "framer-motion";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkSolid,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faBed,
  faPaw,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchBookmarkStatus,
  toggleBookmark,
} from "../../services/bookmarksApi";
import toast from "react-hot-toast";

function EachHome({ house }) {
  const {
    id,
    name,
    price,
    bedRooms,
    image,
    address,
    phoneNumber,
    isPetAllowed,
  } = house;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageSrc, setImageSrc] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const {
    user: { id: myId },
  } = useAuth();

  useEffect(() => {
    async function handleBookmarksStatus() {
      const status = await fetchBookmarkStatus(myId, id);
      console.log(status);
      setIsBookmarked(status);
    }
    handleBookmarksStatus();
  }, [myId, id]);

  async function handleClickLike(e) {
    e.stopPropagation();
    try {
      const message = await toggleBookmark(myId, id);
      console.log(message);
      setIsBookmarked((v) => !v);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  function handleIncImageSrc(e) {
    e.stopPropagation();
    if (imageSrc < image.length - 1) {
      setLoading(true);
      setImageSrc((prev) => prev + 1);
    }
  }

  function handleDecImageSrc(e) {
    e.stopPropagation();
    if (imageSrc > 0) {
      setLoading(true);
      setImageSrc((prev) => prev - 1);
    }
  }

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <motion.div
      className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl hover:shadow-2xl"
      onClick={() => {
        navigate(`/homesforrent/personalbuildings/${id}`);
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="space-y-1">
          <motion.h2
            className="text-xl font-bold text-gray-800"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {name}
          </motion.h2>
          <div className="flex items-center gap-1 text-gray-600">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-sm text-red-500"
            />
            <p className="text-sm">{address.city}</p>
          </div>
        </div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <motion.div
            className={`p-2 rounded-full transition-all duration-200 ${
              isBookmarked
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-500"
            }`}
            onClick={handleClickLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon
              icon={isBookmarked ? faBookmarkSolid : faBookmark}
              className="w-5 h-5"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="flex gap-1 sm:gap-3 md:gap-4">
          {/* Image Carousel */}
          <div className="relative flex flex-1 overflow-hidden rounded-xl group">
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100"
                >
                  <LoadingSpinner />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.img
              key={imageSrc}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="object-cover w-full h-full"
              src={image[imageSrc]}
              onLoad={handleImageLoad}
              alt="House"
            />

            {/* Image Navigation */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {imageSrc > 0 && (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute p-2 text-white transition-all duration-200 -translate-y-1/2 rounded-full left-2 top-1/2 bg-black/70 hover:bg-black/90"
                      onClick={handleDecImageSrc}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="w-3 h-3"
                      />
                    </motion.button>
                  )}

                  {!(imageSrc === image.length - 1) && (
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute p-2 text-white transition-all duration-200 -translate-y-1/2 rounded-full right-2 top-1/2 bg-black/70 hover:bg-black/90"
                      onClick={handleIncImageSrc}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-3 h-3"
                      />
                    </motion.button>
                  )}
                </>
              )}
            </AnimatePresence>

            {/* Image Indicators */}
            <div className="absolute flex gap-1 -translate-x-1/2 bottom-2 left-1/2">
              {image.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === imageSrc ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl font-bold text-green-700">
                    {price}
                  </span>
                  <span className="ml-1 text-sm text-green-600">BIRR</span>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 gap-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <FontAwesomeIcon icon={faBed} className="text-blue-500" />
                  <span className="font-medium">{bedRooms} Bedrooms</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FontAwesomeIcon
                    icon={faPaw}
                    className={isPetAllowed ? "text-green-500" : "text-red-500"}
                  />
                  <span
                    className={`text-sm ${
                      isPetAllowed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPetAllowed ? "Pets Allowed" : "Pets not Allowed"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FontAwesomeIcon icon={faPhone} className="text-purple-500" />
                  <span className="font-medium">{phoneNumber}</span>
                </div>
              </motion.div>
            </div>

            <motion.button
              className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl hover:shadow-xl"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Send Email</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EachHome;
