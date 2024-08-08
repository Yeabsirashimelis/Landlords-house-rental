import { faBookmark, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ManageRentalsNav() {
  return (
    <div className="w-[200px]  text-gray-700 flex flex-col gap-4">
      <Link
        to="/add-property"
        className="hover:text-blue-600 hover:underline transition duration-200"
      >
        <FontAwesomeIcon icon={faAdd} className="mr-2" />
        Add property
      </Link>
      <Link
        to="/manage-rentals/my-listings"
        className="hover:text-blue-600 hover:underline transition duration-200"
      >
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        My Listings
      </Link>

      <Link
        to="/my-bookmarks"
        className="hover:text-blue-600 hover:underline transition duration-200"
      >
        <FontAwesomeIcon icon={faBookmark} className="mr-2" />
        Bookmarks
      </Link>

      <Link
        to="/manage-rentals/messages"
        className="hover:text-blue-600 hover:underline transition duration-200"
      >
        <FontAwesomeIcon icon={faMessage} className="mr-2" />
        Messages
      </Link>
    </div>
  );
}

export default ManageRentalsNav;
