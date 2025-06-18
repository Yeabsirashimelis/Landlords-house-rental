"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, FileCheck, Key } from "lucide-react";
import { Link } from "react-router-dom";

const tips = [
  {
    icon: Calculator,
    title: "Budget Planning",
    description:
      "Learn how to calculate your ideal rent budget and factor in all expenses.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileCheck,
    title: "Application Tips",
    description:
      "Get your rental application approved with our expert guidance.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Key,
    title: "Move-in Checklist",
    description:
      "Essential items and steps for a smooth transition to your new home.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Tenant Rights",
    description: "Know your rights and responsibilities as a tenant.",
    color: "from-orange-500 to-red-500",
  },
];

export default function TipsSection() {
  return (
    <section className="px-4 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <Badge
            variant="secondary"
            className="px-4 py-2 mb-4 text-sm font-medium text-purple-800 bg-purple-100"
          >
            Helpful Resources
          </Badge>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Tips for
            <span className="text-purple-600"> Smart Renters</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Expert advice and resources to help you navigate the rental market
            with confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden transition-all duration-500 bg-white border-0 shadow-lg group hover:shadow-2xl">
                <CardContent className="p-0">
                  <div
                    className={`bg-gradient-to-br ${tip.color} p-8 text-white`}
                  >
                    <tip.icon className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-2 text-xl font-bold">{tip.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="mb-6 leading-relaxed text-gray-600">
                      {tip.description}
                    </p>
                    <Link to="/articles">
                      <Button
                        variant="outline"
                        className="w-full transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto text-white border-0 bg-gradient-to-r from-purple-600 to-pink-600">
            <CardContent className="p-12">
              <h3 className="mb-4 text-3xl font-bold">
                Need Personalized Help?
              </h3>
              <p className="mb-8 text-xl text-purple-100">
                Our rental experts are here to guide you through every step of
                your journey
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 font-semibold text-purple-600 transition-all duration-300 bg-white rounded-full hover:bg-purple-50 hover:scale-105"
              >
                Get Expert Advice
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
