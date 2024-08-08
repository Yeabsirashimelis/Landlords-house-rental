import { useQuery } from "@tanstack/react-query";
import { countHouses } from "../../services/HouseApi";

function RentalListsHeader() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["counthomes"],
    queryFn: countHouses,
  });

  if (isLoading) return <p>loading</p>;
  return (
    <div className="bg-gray-50 py-2">
      <p>{data.count} Houses found for Rent</p>
    </div>
  );
}

export default RentalListsHeader;
