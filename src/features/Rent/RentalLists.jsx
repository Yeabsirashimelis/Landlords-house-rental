"use client";

import { motion, AnimatePresence } from "framer-motion";
import RentalListsHeader from "./RentalListsHeader";
import { handleHouses } from "./handleHouses";
import EachHome from "./EachHome";
import LoadingSpinner from "../../ui/LoadingSpinner";

function RentalLists() {
  const { houses, isLoadingHomes, loadingHomesError } = handleHouses(); //custom hook

  if (isLoadingHomes)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoadingSpinner />
      </div>
    );

  if (loadingHomesError)
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center p-1 overflow-hidden"
      >
        <div className="px-8 py-6 text-center text-white shadow-2xl bg-gradient-to-r from-red-500 to-red-600 rounded-2xl">
          <div className="mb-4 text-6xl">⚠️</div>
          <p className="text-xl font-semibold">
            Can't load houses. Please check your internet connection
          </p>
        </div>
      </motion.div>
    );

  return (
    <div className="h-screen overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-10 border-b border-gray-200 shadow-sm bg-white/80 backdrop-blur-md"
      >
        <div className="py-4 text-xl font-bold text-center text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          <RentalListsHeader />
        </div>
      </motion.div>

      <AnimatePresence>
        <motion.div className="p-2 space-y-2">
          {houses.map((house, index) => (
            <motion.div
              key={house.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -2 }}
            >
              <EachHome house={house} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default RentalLists;
