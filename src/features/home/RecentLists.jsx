import {
  faBath,
  faBed,
  faMapMarker,
  faMoneyBill,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

function RecentLists({ house, loading, error }) {
  const {
    id,
    title,
    price,
    bedRooms,
    bathRooms,
    image,
    address,
    phoneNumber,
    squareFeet,
    isPetAllowed,
  } = house;

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="2xl text-red-800 text-center">Can not fetch RECENT LISTS</p>
    );
  return (
    <div className="rounded-xl shadow-md relative">
      <img src={image[0]} alt="" className="w-full h-auto rounded-t-xl" />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{`Personal House`}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-green-700 font-bold text-right md:text-center lg:text-right">
          {price}Br/mon
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FontAwesomeIcon icon={faBed} className="inLine mr-2" /> {bedRooms}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faBath} className="inLine mr-2" />{" "}
            {bathRooms}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faRulerCombined} className="inLine mr-2" />
            {bathRooms}
            {squareFeet}
            <span className="md:hidden lg:inline"> sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FontAwesomeIcon icon={faMoneyBill} className="inLine mr-2" />{" "}
            Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FontAwesomeIcon
              icon={faMapMarker}
              className="text-orange-700 mt-1"
            />
            <span className="text-orange-700">
              {address.city}, {address.countryName}
            </span>
          </div>
          <Link
            to={`/homesforrent/personalbuildings/${id}`}
            className="h-[36px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecentLists;
