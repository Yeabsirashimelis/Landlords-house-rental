import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../services/HouseApi";

export function handleHouses() {
  const {
    isPending: isLoadingHomes,
    data: houses,
    error: loadingHomesError,
  } = useQuery({
    queryKey: ["houses"],
    queryFn: getHome,
  });
  return { isLoadingHomes, loadingHomesError, houses };
}
