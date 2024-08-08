import { useQuery } from "@tanstack/react-query";
import { getNearByInfos } from "../../services/DetailsApi";
import LoadingSpinner from "../../ui/LoadingSpinner";
import NeighborhoodDetails from "./NeighborhoodDetails";
import DetailsNeghborhoodMap from "./DetailsNeghborhoodMap";

function NeighBourhood({ home }) {
  const { address } = home;
  const {
    data: nearByInfos,
    isLoading: isLoadingInfos,
    error: loadingInfosError,
  } = useQuery({
    queryKey: ["nearByInfos", address.latitude, address.longitude],
    queryFn: () => getNearByInfos(address.latitude, address.longitude),
  });

  const categorieNearByInfos = (info) => {
    return nearByInfos.reduce((acc, info) => {
      const { tags } = info;
      if (!acc[tags.amenity]) {
        acc[tags.amenity] = [];
      }
      acc[tags.amenity].push(info);
      return acc;
    }, {});
  };

  const infosPerCategory = nearByInfos ? categorieNearByInfos(nearByInfos) : [];

  if (isLoadingInfos) return <LoadingSpinner />;
  return (
    <div className=" mx-auto  px-12 mt-12 bg-gray-50 py-8">
      <h2 className="text-xl font-bold  ">NEIGHBORHOOD</h2>
      <DetailsNeghborhoodMap home={home} />
      <p
        className="text-blue-500 font-bold border border-blue-500
       px-2 py-1 flex justify-center mt-12"
      >
        In 3 km radius from this house
      </p>
      {Object.entries(infosPerCategory).map(([category, nearByInfos]) => (
        <NeighborhoodDetails
          category={category}
          nearByInfos={nearByInfos}
          key={category}
        />
      ))}
    </div>
  );
}

export default NeighBourhood;
