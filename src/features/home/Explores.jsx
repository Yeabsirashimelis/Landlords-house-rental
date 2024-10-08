import { Link } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { handleHouses } from "../Rent/handleHouses";
import RecentLists from "./RecentLists";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../services/HouseApi";

function Explores() {
  const { houses, isLoadingHomes, loadingHomesError } = handleHouses(); //custom hook
  // const {
  //   isPending: isLoadingHomes,
  //   data: houses,
  //   error: loadingHomesError,
  // } = useQuery({
  //   queryKey: ["houses"],
  //   queryFn: getHome,
  // });
  const recentHouses = houses
    ?.sort(() => Math.random() - Math.random())
    .slice(0, 3);
  console.log(isLoadingHomes);
  console.log(loadingHomesError);

  return (
    <section className="relative px-4 py-6 mt-12 flex flex-col justify-center items-center ">
      <p className="font-bold text-3xl md:text-4xl mb-8">Recent Properties</p>
      {loadingHomesError && <p>Can't load recent lists</p>}
      {isLoadingHomes && <p>loading recent lists...</p>}

      {houses && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentHouses &&
            recentHouses.map((house, index) => (
              <RecentLists house={house} key={index} />
            ))}
        </div>
      )}
      <div className="flex justify-center mt-6 text-center">
        <Link
          to="/homesforrent/personalbuildings"
          className="bg-green-900 px-2 py-1 border border-green-900 rounded-md text-white
          hover:bg-white hover:text-green-900 hover:scale-105 transition-full duration-100 "
        >
          View More
        </Link>
      </div>
    </section>
  );
}

export default Explores;
