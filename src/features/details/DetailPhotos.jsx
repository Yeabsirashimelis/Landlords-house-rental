"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function DetailPhotos({ home }) {
  const { image } = home;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Show only first 4 images initially
  const visibleImages = showAllImages ? image : image.slice(0, 4);
  const remainingCount = image.length - 4;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNextImage();
          break;
        case "Escape":
          closeLightbox();
          break;
        case "+":
        case "=":
          e.preventDefault();
          setZoom((prev) => Math.min(prev + 0.25, 3));
          break;
        case "-":
          e.preventDefault();
          setZoom((prev) => Math.max(prev - 0.25, 0.5));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const handlePrevImage = useCallback(() => {
    if (isLightboxOpen) {
      setLightboxIndex((prev) => (prev === 0 ? image.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? image.length - 1 : prev - 1));
    }
    setZoom(1);
    setRotation(0);
  }, [isLightboxOpen, image.length]);

  const handleNextImage = useCallback(() => {
    if (isLightboxOpen) {
      setLightboxIndex((prev) => (prev === image.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === image.length - 1 ? 0 : prev + 1));
    }
    setZoom(1);
    setRotation(0);
  }, [isLightboxOpen, image.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setZoom(1);
    setRotation(0);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoom(1);
    setRotation(0);
    document.body.style.overflow = "unset";
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Property Image",
          url: image[lightboxIndex],
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image[lightboxIndex];
    link.download = `property-image-${lightboxIndex + 1}.jpg`;
    link.click();
  };

  if (!image || image.length === 0) return null;

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full max-w-6xl p-4 mx-auto">
        {/* Hero Image */}
        <div className="relative mb-6 group">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            <img
              src={image[currentIndex] || "/placeholder.svg"}
              alt={`Property image ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Overlay with controls */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 group-hover:opacity-100">
              <div className="absolute flex gap-2 top-4 right-4">
                <Badge className="text-white border-0 bg-black/60 backdrop-blur-sm">
                  {currentIndex + 1} / {image.length}
                </Badge>
                <Button
                  size="sm"
                  className="text-white border-0 bg-black/60 hover:bg-black/80 backdrop-blur-sm"
                  onClick={() => openLightbox(currentIndex)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute flex items-center justify-between bottom-4 left-4 right-4">
                <Button
                  size="sm"
                  onClick={handlePrevImage}
                  className="text-gray-900 shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleNextImage}
                  className="text-gray-900 shadow-lg bg-white/90 hover:bg-white backdrop-blur-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid - Smart Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Property Images</h3>
            {image.length > 4 && (
              <Button
                variant="outline"
                onClick={() => setShowAllImages(!showAllImages)}
                className="text-sm"
              >
                {showAllImages
                  ? "Show Less"
                  : `View All ${image.length} Images`}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {visibleImages.map((img, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => openLightbox(index)}
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Property image ${index + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-colors duration-200 bg-black/0 group-hover:bg-black/20">
                    <ZoomIn className="w-6 h-6 text-white transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                  </div>
                  {index === currentIndex && (
                    <div className="absolute inset-0 ring-2 ring-blue-500 ring-offset-2 rounded-xl" />
                  )}
                </button>
              </div>
            ))}

            {/* Show remaining count overlay on last image */}
            {!showAllImages && remainingCount > 0 && (
              <button
                onClick={() => setShowAllImages(true)}
                className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-900/80 hover:bg-gray-900/90 transition-colors duration-300 shadow-md hover:shadow-xl flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">+{remainingCount}</div>
                  <div className="text-sm opacity-90">More Images</div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="relative flex items-center justify-center w-full h-full p-4">
            {/* Header Controls */}
            <div className="absolute z-10 flex items-center justify-between top-4 left-4 right-4">
              <Badge className="text-white border-0 bg-white/10 backdrop-blur-sm">
                {lightboxIndex + 1} / {image.length}
              </Badge>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.5))}
                  className="text-white border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setZoom((prev) => Math.min(prev + 0.25, 3))}
                  className="text-white border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setRotation((prev) => prev + 90)}
                  className="text-white border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleShare}
                  className="text-white border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="text-white border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={closeLightbox}
                  className="text-white border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative max-w-full max-h-full overflow-hidden">
              <img
                src={image[lightboxIndex] || "/placeholder.svg"}
                alt={`Property image ${lightboxIndex + 1}`}
                className="object-contain max-w-full max-h-full transition-transform duration-300"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
              />
            </div>

            {/* Navigation Arrows */}
            <Button
              size="lg"
              onClick={handlePrevImage}
              className="absolute w-12 h-12 text-white -translate-y-1/2 border-0 rounded-full left-4 top-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="lg"
              onClick={handleNextImage}
              className="absolute w-12 h-12 text-white -translate-y-1/2 border-0 rounded-full right-4 top-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Bottom Thumbnail Strip */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-center max-w-full gap-2 pb-2 overflow-x-auto">
                {image
                  .slice(Math.max(0, lightboxIndex - 3), lightboxIndex + 4)
                  .map((img, index) => {
                    const actualIndex = Math.max(0, lightboxIndex - 3) + index;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => setLightboxIndex(actualIndex)}
                        className={`relative aspect-[4/3] h-16 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                          lightboxIndex === actualIndex
                            ? "ring-2 ring-white scale-110"
                            : "hover:scale-105 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Thumbnail ${actualIndex + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPhotos;
