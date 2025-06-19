"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchBookmarkStatus,
  toggleBookmark,
} from "../../services/bookmarksApi";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

function OverView({ home }) {
  const {
    id: homeId,
    address: { city, countryName, locality, principalSubdivision },
    bathRooms,
    bedRooms,
    description,
    isPetAllowed,
    leaseTerms,
    phoneNumber,
    price,
    squareFeet,
    title,
    availableDays,
    AdditionalFeatures: additionalFeatures,
  } = home;

  const {
    user: { id: myId },
  } = useAuth();

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    async function handleBookmarksStatus() {
      const status = await fetchBookmarkStatus(myId, homeId);
      console.log(status);
      setIsBookmarked(status);
    }
    handleBookmarksStatus();
  }, [myId, homeId]);

  async function handleClickLike(e) {
    try {
      const message = await toggleBookmark(myId, homeId);
      console.log(message);
      setIsBookmarked((v) => !v);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  return (
    <div className="py-12 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl">
            {title}
          </h1>
        </div>

        <div className="p-8 mb-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">{price}</div>
              <div className="text-sm font-medium text-gray-500">
                Birr/month
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">{bedRooms}</div>
              <div className="text-sm font-medium text-gray-500">Bedrooms</div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {bathRooms}
              </div>
              <div className="text-sm font-medium text-gray-500">Bathrooms</div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">
                {squareFeet}
              </div>
              <div className="text-sm font-medium text-gray-500">Sq Ft</div>
            </div>
          </div>

          <div className="pt-6 mt-6 text-center border-t border-gray-200">
            <p className="font-medium text-gray-600">
              {city}, {principalSubdivision}, {countryName}
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleClickLike}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              isBookmarked
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
            }`}
          >
            <Bookmark
              className={`h-6 w-6 ${isBookmarked ? "fill-current" : ""}`}
            />
            <span>{isBookmarked ? "Bookmarked" : "Add to Bookmarks"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverView;
