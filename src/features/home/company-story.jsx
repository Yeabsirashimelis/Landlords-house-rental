"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Users, Target, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "Building connections between renters and property owners",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Focused on finding the perfect match for every client",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly improving our platform with cutting-edge technology",
  },
];

export default function CompanyStory() {
  return (
    <section className="px-4 py-20 text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
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
                Our Story
              </Badge>
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                In 2024, our CEO
                <span className="text-emerald-400"> YEABSIRA SHIMELIS</span>
                <br />
                discovered a problem
              </h2>
            </div>

            <Card className="border bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <Quote className="w-12 h-12 mb-4 text-emerald-400" />
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  "Finding quality rental properties was frustrating and
                  time-consuming. I realized there had to be a better way to
                  connect renters with their perfect homes. That's when
                  Landlords was born."
                </p>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-emerald-600">
                    <span className="font-bold text-white">YS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Yeabsira Shimelis
                    </div>
                    <div className="text-sm text-gray-400">CEO & Founder</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6 text-3xl font-bold text-center lg:text-left">
                LANDLORDS Works for You
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-300">
                We've built more than just a platform – we've created a
                community where finding your next home is simple, transparent,
                and stress-free.
              </p>
            </div>

            <div className="grid gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="transition-all duration-300 border bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 p-3 mr-4 bg-emerald-600/20 rounded-xl">
                          <value.icon className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="mb-2 text-xl font-semibold text-white">
                            {value.title}
                          </h4>
                          <p className="text-gray-400">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
