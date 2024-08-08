import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="mt-12   px-4 py-4 bg-gray-50">
      <p className="flex justify-center text-2xl font-extrabold mb-8">
        {title}
      </p>
      <div className="flex justify-around flex-wrap">
        <div className="flex gap-12 font-bold">
          <div>
            <p>{price} Birr</p>
            <p className="font-light">
              {city}, {principalSubdivision}, <br />
              {countryName}
            </p>
          </div>
          <p>{bedRooms} beds</p>
          <p className="border-b-2 h-[23px] border-dashed border-current border-gray-600">
            {bathRooms} baths
          </p>
          <p>{squareFeet} sqft</p>
        </div>
      </div>

      <div
        className="text-green-700 mt-4 font-bold text-xl flex gap-3 justify-center  items-center"
        onClick={handleClickLike}
      >
        {!isBookmarked ? (
          <FontAwesomeIcon icon={faBookmark} style={{ height: "25px" }} />
        ) : (
          <FontAwesomeIcon icon={faBookmarkSolid} style={{ height: "25px" }} />
        )}
        <p>Add to Bookmarks</p>
      </div>
    </div>
  );
}

export default OverView;
