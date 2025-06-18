"use client";

import { motion } from "framer-motion";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { handleHouses } from "./handleHouses";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

function TheMap() {
  const { houses } = handleHouses(); //custom hook
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  if (!houses)
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-50 to-blue-50">
        <LoadingSpinner />
      </div>
    );

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-full"
    >
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <span className="text-sm font-semibold text-gray-700">
          {houses.length} Properties Available
        </span>
      </div>

      <MapContainer
        center={[8.7575, 38.9941]}
        zoom={7}
        className="w-full sm:h-full h-96"
        style={{ borderRadius: "1rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {houses.map((house) => (
          <Marker
            position={[house.address.latitude, house.address.longitude]}
            key={house.id}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 space-y-3">
                <div className="space-y-2 text-base">
                  <h3 className="pb-2 text-lg font-bold text-gray-800 border-b border-gray-200">
                    {house.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-500">🛏️</span>
                      <span>{house.bedRooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-green-500">💰</span>
                      <span className="font-semibold text-green-600">
                        {house.price} Birr
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="text-blue-500">📞</span>
                    <span>{house.phoneNumber}</span>
                  </div>

                  <Link
                    to={`${house.id}`}
                    className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 transform rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </motion.div>
  );
}

export default TheMap;
