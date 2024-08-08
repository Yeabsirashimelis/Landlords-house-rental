import { useAuth } from "../../contexts/AuthContext";
import { fetchBookmarks } from "../../services/bookmarksApi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../ui/LoadingSpinner";
import EachBookmark from "./EachBookmark";
import { Link, useNavigate } from "react-router-dom";
import { faAdd, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BookmarkedPros() {
  const navigate = useNavigate();
  const {
    user: { id: myId },
  } = useAuth();
  const {
    data: bookmarkedHouses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookmarks", myId],
    queryFn: () => fetchBookmarks(myId),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center font-2xl font-extrabold">
        ERROR FETCHING YOUR BOOKMARKS
      </p>
    );
  if (bookmarkedHouses.length === 0) {
    return (
      <header className="bg-white shadow-md flex justify-between items-center px-16 py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          You have no bookmarks
        </h1>
        <Link
          to="/add-property"
          className="text-green-700 font-bold flex items-center"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-2" />
          back
        </Link>
      </header>
    );
  }
  return (
    <div className="p-4">
      <header className="bg-white shadow-md flex justify-between items-center px-16 py-6">
        <h1 className="text-2xl font-bold text-gray-800">My Bookmarks</h1>
        <Link
          to="/add-property"
          className="text-green-700 font-bold flex items-center"
        >
          <FontAwesomeIcon icon={faAdd} className="mr-2" />
          Add Property
        </Link>
      </header>
      <div className="flex flex-wrap gap-6 justify-center">
        {bookmarkedHouses.map((house) => (
          <EachBookmark house={house} key={house.id} />
        ))}
      </div>
    </div>
  );
}

export default BookmarkedPros;
