import RentalHeader from "../features/Rent/RentalHeader";
import RentalLists from "../features/Rent/RentalLists";
import TheMap from "../features/Rent/TheMap";

function PersonalBuildings() {
  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-2 ">
        <TheMap />

        <RentalLists />
      </div>
    </>
  );
}

export default PersonalBuildings;
