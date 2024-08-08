import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function DetailPhotos({ home }) {
  const { image } = home;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(Math.min(image.length, 8));

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, image.length - 8));
    setEndIndex((prev) => Math.min(prev + 1, image.length));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
    setEndIndex((prev) => Math.max(prev - 1, 8));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {image.slice(startIndex, endIndex).map((img, index) => (
          <img
            src={img}
            key={index}
            alt={`Photo ${index + startIndex}`}
            className="object-cover w-full h-48 rounded-md shadow-md"
          />
        ))}
      </div>

      <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="bg-white text-gray-700 border border-gray-300 p-2 rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-[30px] w-[30px]" />
        </button>
        <button
          onClick={handleNext}
          disabled={endIndex >= image.length}
          className="bg-white text-gray-700 border border-gray-300 p-2 rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="h-[30px] w-[30px]"
          />
        </button>
      </div>
    </div>
  );
}

export default DetailPhotos;
