"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, FileText, Shield, Zap } from "lucide-react";
import image1 from "../../images/home-image2.jpg";
import image2 from "../../images/home-image3.jpg";

const features = [
  {
    icon: Megaphone,
    title: "Advertise Your Rental",
    description:
      "Connect with thousands of renters looking for new homes using our comprehensive marketing platform.",
    image: image1,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: FileText,
    title: "Lease 100% Online",
    description:
      "Find your dream rental property. Bookmark properties and contact owners all powered on a single platform.",
    image: image2,
    gradient: "from-emerald-500 to-teal-600",
  },
];

export default function PropertyManagement() {
  return (
    <section className="px-4 py-20 bg-gradient-to-b from-white to-slate-50">
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
            className="px-4 py-2 mb-4 text-sm font-medium text-blue-800 bg-blue-100"
          >
            Property Management
          </Badge>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            The Perfect Place to
            <span className="text-blue-600"> Manage Your Property</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Work with the best suite of property management tools on the market.
            Streamline your rental business with our comprehensive platform.
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <Card
                  className={`bg-gradient-to-br ${feature.gradient} border-0 text-white p-8 shadow-2xl`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="p-3 mr-4 bg-white/20 backdrop-blur-sm rounded-xl">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold md:text-3xl">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Additional Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-white border border-gray-100 shadow-md rounded-xl">
                    <Shield className="w-6 h-6 mr-3 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Secure</div>
                      <div className="text-sm text-gray-600">
                        Bank-level security
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-white border border-gray-100 shadow-md rounded-xl">
                    <Zap className="w-6 h-6 mr-3 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Fast</div>
                      <div className="text-sm text-gray-600">
                        Instant processing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden shadow-2xl rounded-3xl"
                >
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-20`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
