import { useQuery } from "@tanstack/react-query";
import { getLister } from "../../services/HouseApi";

function HomeLord({ home }) {
  const { userId, availableDays } = home;

  const { data, isPending, error } = useQuery({
    queryKey: ["lister", userId],
    queryFn: () => getLister(userId),
  });

  return (
    <div className="mx-auto px-6 mt-4 mr-6 ml-6 bg-white py-6 border border-gray-200 rounded-lg shadow-md">
      <span
        className={`${
          error ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
        } rounded-lg px-3 py-2 mb-4 block`}
      >
        {isPending && "Loading lister..."}
        {data && `Listing provided by ${data.userName}`}
        {error && `${error.message}`}
      </span>

      <p className="mb-4 text-gray-700">
        If you think to request a tour or some other things that involve the
        physical presence at this house, please consider the following
        information about the landlord's available days:
      </p>
      <div className="space-y-2">
        {availableDays.map((day) => (
          <div
            key={day}
            className="bg-gray-100 px-4 py-2 rounded-lg text-gray-600"
          >
            <p>{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeLord;
