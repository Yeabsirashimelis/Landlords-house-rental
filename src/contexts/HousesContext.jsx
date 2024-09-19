import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../services/HouseApi";

const HouseContext = createContext();

function HouseProvider({ children }) {
  const [address, setAddress] = useState({});

  return (
    <HouseContext.Provider value={{ address, setAddress }}>
      {children}
    </HouseContext.Provider>
  );
}

function useHouses() {
  const context = useContext(HouseContext);
  if (context === undefined)
    throw new Error("Houses context should be used in HouseProvider");

  return context;
}

export { HouseProvider, useHouses };
