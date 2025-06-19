import { useQuery } from "@tanstack/react-query";
import { getNearByInfos } from "../../services/DetailsApi";
import LoadingSpinner from "../../ui/LoadingSpinner";
import NeighborhoodDetails from "./NeighborhoodDetails";
import DetailsNeghborhoodMap from "./DetailsNeghborhoodMap";
import { MapPin } from "lucide-react";

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
    <div className="px-6 mx-auto mt-16 max-w-7xl">
      <div className="p-8 border border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600 shadow-lg rounded-xl">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">NEIGHBORHOOD</h2>
        </div>

        <DetailsNeghborhoodMap home={home} />

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg">
            <MapPin className="w-5 h-5" />
            <span>Within 3 km radius from this house</span>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {Object.entries(infosPerCategory).map(([category, nearByInfos]) => (
            <NeighborhoodDetails
              category={category}
              nearByInfos={nearByInfos}
              key={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NeighBourhood;
