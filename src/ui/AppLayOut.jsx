import { Outlet } from "react-router-dom";
import HomeTop from "../features/home/HomeTop";

function AppLayOut() {
  return (
    <div className="grid grid-rows-[auto,1fr] h-screen overflow-hidden">
      <div>
        <HomeTop />
      </div>

      <div className="overflow-hidden">
        <main className="h-full mx-auto overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayOut;
