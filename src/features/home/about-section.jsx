"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Home, Award } from "lucide-react";
import image from "../../images/home-image1.jpg";

const stats = [
  { icon: Home, value: "10K+", label: "Properties Listed" },
  { icon: Users, value: "50K+", label: "Happy Renters" },
  { icon: Award, value: "5 Years", label: "Experience" },
];

const features = [
  "Verified property listings",
  "24/7 customer support",
  "Secure online payments",
  "Professional photography",
];

export default function AboutSection() {
  return (
    <section className="px-4 py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden shadow-2xl rounded-3xl">
              <img
                src={image}
                alt="Modern apartment interior"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute p-6 border shadow-2xl -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl border-white/20"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <stat.icon className="w-6 h-6 mb-2 text-emerald-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <Badge
                variant="secondary"
                className="px-4 py-2 mb-4 text-sm font-medium bg-emerald-100 text-emerald-800"
              >
                About Landlords
              </Badge>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                The Most Comprehensive
                <span className="text-emerald-600"> Rental Platform</span>
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                Choose from thousands of apartments, houses, condos, and
                townhouses for rent. We make finding your perfect home simple,
                secure, and stress-free.
              </p>
            </div>

            <Card className="text-white border-0 bg-gradient-to-br from-emerald-600 to-teal-600">
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold">Renting Made Simple</h3>
                <p className="mb-6 leading-relaxed text-emerald-100">
                  Browse the highest quality listings, message landlords online,
                  and find your comfortable place without having to leave your
                  current home.
                </p>

                <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="flex-shrink-0 w-5 h-5 mr-3 text-emerald-200" />
                      <span className="text-sm text-emerald-100">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  className="px-6 py-3 font-semibold transition-all duration-300 bg-white rounded-full text-emerald-600 hover:bg-emerald-50 hover:scale-105 group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
