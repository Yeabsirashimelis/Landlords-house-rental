import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkSolid,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchBookmarkStatus,
  toggleBookmark,
} from "../../services/bookmarksApi";
import toast from "react-hot-toast";

function EachHome({ house }) {
  const {
    id,
    name,
    price,
    bedRooms,
    image,
    address,
    phoneNumber,
    isPetAllowed,
  } = house;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageSrc, setImageSrc] = useState(5);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    user: { id: myId },
  } = useAuth();

  useEffect(() => {
    async function handleBookmarksStatus() {
      const status = await fetchBookmarkStatus(myId, id);
      console.log(status);
      setIsBookmarked(status);
    }
    handleBookmarksStatus();
  }, [myId, id]);

  async function handleClickLike(e) {
    e.stopPropagation();
    try {
      const message = await toggleBookmark(myId, id);
      console.log(message);
      setIsBookmarked((v) => !v);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  function handleIncImageSrc(e) {
    e.stopPropagation();
    if (imageSrc < image.length - 1) {
      setLoading(true);
      setImageSrc((prev) => prev + 1);
    }
  }

  function handleDecImageSrc(e) {
    e.stopPropagation();
    if (imageSrc > 0) {
      setLoading(true);
      setImageSrc((prev) => prev - 1);
    }
  }

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <div
      className="mt-1 border-y bg-gray-50 border-gray-300 px-1 py-4 text-gray-600 space-y-1"
      onClick={() => {
        navigate(`/homesforrent/personalbuildings/${id}`);
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold sm:text-lg lg:text-xl">{name}</h2>
          <p className="text-sm">{address.city}</p>
        </div>

        <div className="flex gap-4">
          <div className="h-8 w-px bg-gray-400 "></div>
          <div className="text-green-800" onClick={handleClickLike}>
            {!isBookmarked ? (
              <FontAwesomeIcon icon={faBookmark} style={{ height: "25px" }} />
            ) : (
              <FontAwesomeIcon
                icon={faBookmarkSolid}
                style={{ height: "25px" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-t pt-3 border-gray-300 pl-1 relative">
        <div className="relative w-[300px] md:w-[350px] h-[150px] md:h-[200px]">
          {loading && (
            <div>
              <LoadingSpinner />
            </div>
          )}
          <img
            className=" rounded-lg h-full w-full"
            src={image[imageSrc]}
            onLoad={handleImageLoad}
            alt="House"
          />
          {imageSrc > 0 && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 px-2"
              onClick={handleDecImageSrc}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          {!(imageSrc === image.length - 1) && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 px-2"
              onClick={handleIncImageSrc}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
        <div className="space-y-2">
          <p>{price} BIRR</p>
          <p>{bedRooms} Beds</p>
          <p className="text-sm">
            {isPetAllowed ? "Pets Allowed" : "Pets not Allowed"}
          </p>
          <p>{phoneNumber}</p>
          <button className="bg-green-800 text-gray-50 w-full py-[2px] rounded-md hover:bg-green-950 transition-all duration-300">
            Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default EachHome;
