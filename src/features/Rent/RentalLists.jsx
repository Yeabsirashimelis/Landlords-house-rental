import RentalListsHeader from "./RentalListsHeader";
import { handleHouses } from "./handleHouses";
import EachHome from "./EachHome";
import LoadingSpinner from "../../ui/LoadingSpinner";

function RentalLists() {
  const { houses, isLoadingHomes, loadingHomesError } = handleHouses(); //custom hook

  if (isLoadingHomes) return <LoadingSpinner />;
  if (loadingHomesError)
    return (
      <p className="text-2xl bg-red-400 px-4 py-2">
        can't load houses. please check your internet connection
      </p>
    );
  return (
    <div className="h-screen overflow-y-scroll  overflow-x-scroll bg-gray-200 border-t border-t-gray-300">
      <div className="text-center font-bold text-lg">
        <RentalListsHeader />
      </div>
      <>
        {houses.map((house) => (
          <EachHome house={house} key={house.id} />
        ))}
      </>
    </div>
  );
}

export default RentalLists;
