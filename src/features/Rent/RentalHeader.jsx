import { useState } from "react";
import Criteria from "../../ui/Criteria";

function RentalHeader() {
  const [openCriteria, setOpenCriteria] = useState(null);

  const handleCriteriaClick = (label) => {
    setOpenCriteria(openCriteria === label ? null : label);
  };

  return (
    <div className="flex gap-4 justify-center my-4">
      <Criteria
        width="200px"
        label="City, Country"
        isOpen={openCriteria === "City, Country"}
        onClick={() => handleCriteriaClick("City, Country")}
      />
      <Criteria
        width="100px"
        label="Rent"
        icon={false}
        isOpen={openCriteria === "Rent"}
        onClick={() => handleCriteriaClick("Rent")}
      ></Criteria>
      <Criteria
        width="150px"
        label="Price"
        isOpen={openCriteria === "Price"}
        onClick={() => handleCriteriaClick("Price")}
      >
        <div className="space-y-6">
          <p className="bg-gray-200 text-center py-1 font-bold">Price Range</p>
          <div className="flex gap-8">
            <div className="flex flex-col space-y-2">
              <p>Minimum</p>
              <input
                className="w-[70px] border text-center outline-none border-gray-400"
                type="number"
              />
            </div>
            <p className="mt-8">-</p>
            <div className="flex flex-col space-y-2">
              <p>Maximum</p>
              <input
                className="w-[70px] border text-center outline-none border-gray-400"
                type="number"
              />
            </div>
          </div>
          <button className="bg-green-800 text-gray-50 w-full py-1 rounded-md hover:bg-green-950 transition-all duration-300">
            Apply
          </button>
        </div>
      </Criteria>
      <Criteria
        width="150px"
        label="Bed Rooms"
        isOpen={openCriteria === "Bed Rooms"}
        onClick={() => handleCriteriaClick("Bed Rooms")}
      >
        <div className="space-y-6">
          <p className="bg-gray-200 text-center py-1 font-bold">Bed Rooms</p>
          <div className="flex">
            <button className="border px-2 border-green-800">1+</button>
            <button className="border px-2 border-green-800">2+</button>
            <button className="border px-2 border-green-800">3+</button>
            <button className="border px-2 border-green-800">4+</button>
            <button className="border px-2 border-green-800">5+</button>
          </div>
          <button className="bg-green-800 text-gray-50 w-full py-1 rounded-md hover:bg-green-950 transition-all duration-300">
            Apply
          </button>
        </div>
      </Criteria>
    </div>
  );
}

export default RentalHeader;
