import { Link } from "react-router-dom";

function RentalNavs() {
  return (
    <div className="w-full text-gray-800 flex flex-col gap-4">
      <div>
        <h2 className="font-light text-lg">Search for rentals</h2>
      </div>
      <div className="flex flex-col gap-4">
        <Link
          to="/homesforrent/personalbuildings"
          className="hover:text-blue-600 hover:underline transition duration-200"
        >
          Personal Houses
        </Link>
        <div className="font-light">
          <Link
            to="/homesforrent/realestates"
            className="font-bold hover:text-blue-600 hover:underline transition duration-200"
          >
            Real Estates
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RentalNavs;
