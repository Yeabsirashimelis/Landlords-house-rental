import { useEffect, useRef } from "react";
import AboutRent from "../features/home/AboutRent";
import Explores from "../features/home/Explores";
import HomeBottom from "../features/home/HomeBottom";
import HomeTop from "../features/home/HomeTop";
import Homephoto from "../features/home/Homephoto";
import PropertyManage from "../features/home/PropertyManage";
import TipsForRenters from "../features/home/TipsForRenters";
import Footer from "../ui/Footer";

function Home() {
  return (
    <div className=" text-gray-600 ">
      <Homephoto />
      <Explores />
      <AboutRent />
      <PropertyManage />
      <HomeBottom />
      <TipsForRenters />
      <Footer />
    </div>
  );
}

export default Home;
