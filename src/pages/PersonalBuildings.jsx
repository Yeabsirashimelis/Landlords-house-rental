"use client";

import { motion } from "framer-motion";
import RentalLists from "../features/Rent/RentalLists";
import TheMap from "../features/Rent/TheMap";

function PersonalBuildings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <div className="grid grid-cols-1 gap-0 p-2 sm:grid-cols-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden bg-white shadow-2xl"
        >
          <TheMap />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col overflow-hidden bg-white shadow-2xl"
        >
          <RentalLists />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PersonalBuildings;
