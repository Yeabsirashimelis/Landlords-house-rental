"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import home from "/home.mp4";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          >
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-emerald-500 border-t-transparent"
                />
                <p className="text-lg font-medium text-white">
                  Loading your perfect home...
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          className="object-cover w-full h-full"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoading(false)}
        >
          <source src={home} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-5xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text"
          >
            Discover Your New Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 text-xl font-light text-gray-200 md:text-2xl"
          >
            Helping thousands of renters find their perfect fit
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-2xl bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/25 hover:scale-105"
            >
              Start Your Search
            </Button>
            <Link to="/add-property">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-green-700 rounded-full shadow-2xl hover:bg-emerald-700 hover:bg-green-800 hover:scale-105"
              >
                List Your Property
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Video Controls */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute p-3 transition-all duration-300 rounded-full bottom-8 left-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 1.5,
          }}
          onClick={scrollToContent}
          className="absolute transition-colors duration-300 transform -translate-x-1/2 bottom-8 left-1/2 text-white/70 hover:text-white"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </div>
  );
}
