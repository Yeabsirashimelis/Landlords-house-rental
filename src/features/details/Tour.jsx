import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "./utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { getLister } from "../../services/HouseApi";
import { useQuery } from "@tanstack/react-query";

function Tour({ home, setIsTourFormOpened }) {
  const { id, phoneNumber, created_at, title, userId } = home;
  const createdAt = formatDate(created_at);
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["listerName"],
    queryFn: () => getLister(userId),
  });

  function handleOpenMessagePage() {
    navigate(`/manage-rentals/messages/${userId}/${id}`);
  }
  // /message-for/:homeName/:houseId/with/:listerId

  return (
    <div
      className="space-y-3 flex flex-col px-2 py-2 
        justify-center sm:border z-[9998] sm:border-gray-400 rounded-lg text-sm font-bold"
    >
      {/* Visible only on screens larger than 'sm' */}
      <div className="hidden sm:block">
        <p className="text-lg text-center font-light">Contact this Property</p>
      </div>
      {/* Always visible */}
      <div className="sm:flex sm:gap-4 mx-auto justify-center">
        <button
          className="bg-green-800 text-gray-50 rounded-lg px-4 py-1"
          onClick={() => setIsTourFormOpened(true)}
        >
          Request a tour
        </button>
        <button
          className="border border-green-800 rounded-lg px-4 py-1"
          onClick={handleOpenMessagePage}
        >
          Send message
        </button>
      </div>
      {/* Visible only on screens larger than 'sm' */}
      <div className="hidden sm:flex items-center justify-center border-b border-gray-300 py-2 text-blue-400 font-light text-lg">
        <FontAwesomeIcon icon={faPhone} style={{ height: "20px" }} flip />
        <p className=" text-center">{phoneNumber}</p>
      </div>
      <div className="hidden sm:block mt-4 bg-green-300 text-black text-center py-3 font-light">
        Listed At : {createdAt}
      </div>
    </div>
  );
}

export default Tour;
