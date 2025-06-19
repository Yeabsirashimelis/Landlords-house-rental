import { MapPin } from "lucide-react";

function NeighborhoodDetails({ category, nearByInfos }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          {category.replace(/_/g, " ").toUpperCase()}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nearByInfos.map(
          (info) =>
            info.tags.name && (
              <div
                key={info.id}
                className="px-4 py-3 transition-all duration-200 bg-white border border-blue-200 shadow-sm rounded-xl hover:shadow-md hover:border-blue-300 group"
              >
                <p className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-700">
                  {info.tags?.name}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default NeighborhoodDetails;
