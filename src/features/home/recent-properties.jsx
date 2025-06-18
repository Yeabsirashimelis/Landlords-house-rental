import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { useState } from "react";
import { handleHouses } from "../Rent/handleHouses";
import { Link } from "react-router-dom";

const PropertySkeleton = () => (
  <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
    <div className="relative overflow-hidden">
      {/* Image Skeleton */}
      <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />

      {/* Featured Badge Skeleton */}
      <div className="absolute w-20 h-6 bg-gray-300 rounded-full top-4 left-4 animate-pulse" />

      {/* Heart Button Skeleton */}
      <div className="absolute w-10 h-10 bg-gray-300 rounded-full top-4 right-4 animate-pulse" />
    </div>

    <CardContent className="p-6">
      {/* Title and Price Skeleton */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 mr-4">
          <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="text-right">
          <div className="w-20 h-6 mb-1 bg-gray-300 rounded animate-pulse" />
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Location Skeleton */}
      <div className="flex items-center mb-4">
        <div className="w-4 h-4 mr-2 bg-gray-300 rounded animate-pulse" />
        <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Property Details Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 bg-gray-300 rounded animate-pulse" />
          <div className="w-12 h-4 bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-14 animate-pulse" />
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-1 bg-gray-300 rounded animate-pulse" />
          <div className="w-12 h-4 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="w-full h-12 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
    </CardContent>
  </Card>
);

export default function RecentProperties() {
  const [likedProperties, setLikedProperties] = useState([]);

  const { houses, isLoadingHomes, loadingHomesError } = handleHouses();

  const recentHouses = houses
    ?.sort(() => Math.random() - Math.random())
    .slice(0, 3);
  console.log(isLoadingHomes);
  console.log(loadingHomesError);

  console.log(recentHouses);

  const toggleLike = (id) => {
    setLikedProperties((prev) =>
      prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]
    );
  };

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
            className="px-4 py-2 mb-4 text-sm font-medium bg-emerald-100 text-emerald-800"
          >
            Featured Properties
          </Badge>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Recent Properties
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Discover handpicked properties that match your lifestyle and budget
          </p>
        </motion.div>

        {isLoadingHomes ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertySkeleton />
              </motion.div>
            ))}
          </div>
        ) : loadingHomesError ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-12 text-center"
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Unable to Load Properties
              </h3>
              <p className="mb-4 text-gray-600">
                We're having trouble loading the recent properties. Please try
                again.
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentHouses?.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all duration-500 border-0 shadow-lg group hover:shadow-2xl bg-white/80 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image[0]}
                      alt={property.title}
                      className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100" />

                    {property.featured && (
                      <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
                        Featured
                      </Badge>
                    )}

                    <button
                      onClick={() => toggleLike(property.id)}
                      className="absolute p-2 transition-all duration-300 rounded-full top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${
                          likedProperties.includes(property.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">
                        {property.title}
                      </h3>
                      <span className="text-2xl font-bold text-emerald-600">
                        {property.price}
                        <span className="text-sm font-normal text-gray-500">
                          /month
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center mb-4 text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    <Button className="w-full py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/homesforrent/personalbuildings">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold transition-all duration-300 border-2 rounded-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:scale-105"
            >
              View All Properties
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
