import { Outlet } from "react-router-dom";
import HomeTop from "../features/home/HomeTop";

function AppLayOut() {
  return (
    <>
      <div className="grid  grid-rows-[auto,1fr]">
        <div>
          <HomeTop />
        </div>

        <div className="">
          <main className="mx-auto h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AppLayOut;
