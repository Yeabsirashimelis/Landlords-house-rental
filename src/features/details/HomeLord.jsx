import { useQuery } from "@tanstack/react-query";
import { getLister } from "../../services/HouseApi";
import { User, Calendar } from "lucide-react";

function HomeLord({ home }) {
  const { userId, availableDays } = home;

  const { data, isPending, error } = useQuery({
    queryKey: ["lister", userId],
    queryFn: () => getLister(userId),
  });

  return (
    <div className="max-w-4xl px-6 mx-auto mt-8">
      <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Property Manager
            </h3>
          </div>

          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              error
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {isPending && "Loading lister..."}
            {data && `Listing provided by ${data.userName}`}
            {error && `${error.message}`}
          </div>
        </div>

        <div className="px-8 py-6">
          <p className="mb-6 leading-relaxed text-gray-600">
            If you think to request a tour or some other things that involve the
            physical presence at this house, please consider the following
            information about the landlord's available days:
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h4 className="font-semibold text-gray-800">Available Days</h4>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableDays.map((day) => (
                <div
                  key={day}
                  className="px-4 py-3 font-medium text-center text-gray-700 transition-colors duration-200 border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl hover:from-indigo-100 hover:to-blue-100"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLord;
