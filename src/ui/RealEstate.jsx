import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function RealEstate() {
  return (
    <section className="bg-blue-50 min-h-screen flex-grow flex items-center justify-center">
      <div className="container max-w-xl py-24 px-4">
        <div className="bg-white px-8 py-16 shadow-md rounded-md border m-4 md:m-0 text-center">
          <div className="flex justify-center mb-6">
            <FontAwesomeIcon icon={faHome} className="text-blue-500 text-6xl" />
          </div>
          <h1 className="text-4xl font-bold mt-4 mb-2">Notice</h1>
          <p className="text-gray-500 text-xl mb-8">
            Currently, we are only providing services for personal houses.
          </p>
          <Link
            to="/home"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RealEstate;
