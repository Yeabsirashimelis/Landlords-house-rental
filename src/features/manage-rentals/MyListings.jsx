import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getMyHomes, removeMyHouse } from "../../services/ManageRentalsApi";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faArrowAltCircleLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "date-fns";

function MyListings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const myId = user?.id;

  const queryClient = useQueryClient();
  const [houseToDelete, setHouseToDelete] = useState(null);

  const {
    data: myListings,
    isLoading: isLoadingMyListing,
    error: loadingMyListingError,
  } = useQuery({
    queryKey: ["myListings", myId],
    queryFn: () => getMyHomes(myId),
    enabled: !!myId, // Ensure query is enabled only when myId is available
  });

  const mutation = useMutation({
    mutationFn: removeMyHouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myListings", myId] });
      toast.success("House removed successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  function handleDelete(id) {
    setHouseToDelete(id);
  }

  function confirmDelete() {
    mutation.mutate(houseToDelete);
    setHouseToDelete(null);
  }

  function cancelDelete() {
    setHouseToDelete(null);
  }

  if (isLoadingMyListing) return <LoadingSpinner />;
  if (loadingMyListingError) return <p>Error loading listings.</p>;
  if (!myListings || myListings.length === 0) {
    return (
      <header className="relative bg-white shadow-md flex justify-between items-center px-16 py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          You don't have any listings yet.
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
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md flex justify-between items-center px-16 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Rental Listings</h1>
        <Link
          to="/add-property"
          className="text-green-700 font-bold flex items-center"
        >
          <FontAwesomeIcon icon={faAdd} className="mr-2" />
          Add Property
        </Link>
      </header>

      <main className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={listing.image[0]}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {listing.title}
                </h2>
                <p className="text-gray-600">{listing?.description}</p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  {listing.price} Birr / month
                </p>
                <p>Listed at :{listing ? listing.created_at : ""}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">
                    {listing?.address.city}, {listing?.address.countryName}
                  </span>
                  <Link
                    to={`/homesforrent/personalbuildings/${listing?.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`edit-listing/${listing.id}`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {houseToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600">
              Are you sure you want to delete this house?
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MyListings;
