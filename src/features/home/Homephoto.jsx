import React, { useState } from "react";
import home from "/home.mp4";
import LoadingSpinner from "../../ui/LoadingSpinner";

function Homephoto() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <div className="relative text-slate-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Skeleton screen */}
            <div className="bg-gray-700 w-full h-80 animate-pulse"></div>
          </div>
        )}

        <video
          className={`object-cover w-full h-80`}
          autoPlay
          muted
          loop
          onLoadedData={handleLoadedData}
        >
          <source src={home} type="video/mp4" />
          {/* Fallback image for browsers that do not support the video tag */}
          <img
            src="/src/images/homebg.jfif"
            alt="company"
            className="w-screen auto"
          />
          Your browser does not support the video tag.
        </video>

        {isLoading && (
          <div
            className="spinner-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2, // Make sure the spinner is on top
            }}
          >
            <LoadingSpinner />
          </div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl sm:text-5xl font-extrabold">
            Discover Your New Home
          </p>
          <p className="text-lg">Helping many renters find their perfect fit</p>
        </div>
      </div>
    </div>
  );
}

export default Homephoto;
