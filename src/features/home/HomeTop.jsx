"use client";

import {
  faHorseHead,
  faBars,
  faTimes,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import RentalNavs from "../Rent/RentalNavs";
import ManageRentalsNav from "../manage-rentals/ManageRentalsNav";
import logo from "../../images/logo.jpg";
import { useAuth } from "../../contexts/AuthContext";

function HomeTop() {
  const [rentalNavsOpen, setRentalNavsOpen] = useState(false);
  const [manageRentalsNavsOpen, setManageRentalsNavsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, signOut } = useAuth();

  function handleCloseNavs() {
    setMobileNavOpen(false);
  }

  return (
    <>
      <nav
        className="relative hidden md:flex md:justify-between md:items-center z-[9999]  
        text-gray-800 bg-white font-semibold h-[55px] border-b border-gray-200 shadow-sm"
      >
        <div
          className="flex items-center h-full px-4 transition duration-200 hover:bg-gray-100"
          onMouseEnter={() => setRentalNavsOpen(true)}
          onMouseLeave={() => setRentalNavsOpen(false)}
        >
          <Link to="#" className="hover:text-blue-600">
            Rentals
          </Link>
          {rentalNavsOpen && (
            <div
              className="absolute top-[55px] left-0 z-[9999] bg-white shadow-lg
              py-4 px-4 sm:px-6 md:px-8 border border-gray-200"
            >
              <RentalNavs />
            </div>
          )}
        </div>

        <div className="flex items-center h-full gap-4 px-4 text-2xl">
          <img
            src={logo || "/placeholder.svg"}
            alt="logo"
            className="w-12 rounded-full"
          />
          <Link to="/home" className="hover:text-blue-600">
            Agenagn
          </Link>
        </div>

        <div
          className="relative flex items-center h-full px-4 transition duration-200 hover:bg-gray-100"
          onMouseEnter={() => setManageRentalsNavsOpen(true)}
          onMouseLeave={() => setManageRentalsNavsOpen(false)}
        >
          <p className="hover:text-blue-600">Manage Rentals</p>
          {manageRentalsNavsOpen && (
            <div
              className="absolute top-[55px] right-0 z-[9999] bg-white shadow-lg
              py-4 px-4 sm:px-6 md:px-8 border border-gray-200"
            >
              <ManageRentalsNav />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 px-4">
          {user ? (
            <>
              <Link to="/user/myAccount">
                <div className="p-2 transition duration-200 bg-red-600 rounded-full hover:bg-red-700">
                  <FontAwesomeIcon
                    icon={faHorseHead}
                    style={{ height: "25px", color: "whitesmoke" }}
                  />
                </div>
              </Link>

              <button
                onClick={signOut}
                className="px-2 py-1 text-sm text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="px-2 py-1 text-sm text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      <div className="flex md:hidden bg-gray-100 z-[1000] shadow-2xl justify-between items-center">
        <button
          className="items-center px-4 py-2 "
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <FontAwesomeIcon
            icon={mobileNavOpen ? faTimes : faBars}
            style={{ height: "25px" }}
          />
        </button>
        <Link
          to="/add-property"
          className="flex items-center mr-12 space-x-2 transition duration-200 hover:text-blue-600"
        >
          <FontAwesomeIcon icon={faAdd} />
          <p>Add Property</p>
        </Link>
      </div>

      {mobileNavOpen && (
        <div className="text-gray-800 bg-white md:hidden">
          <div
            className="flex items-center h-full gap-4 px-4 text-2xl"
            onClick={handleCloseNavs}
          >
            <img
              src={logo || "/placeholder.svg"}
              alt="logo"
              className="w-12 rounded-full"
            />
            <Link to="/home" className="hover:text-blue-600">
              Agenagn
            </Link>
          </div>
          <div
            className="p-4 border-b border-gray-200"
            onClick={handleCloseNavs}
          >
            <RentalNavs />
          </div>
          <div
            className="p-4 border-b border-gray-200"
            onClick={handleCloseNavs}
          >
            <ManageRentalsNav />
          </div>
          <div className="p-4">
            {user ? (
              <>
                <Link
                  to="/user/myAccount"
                  className="block mb-4"
                  onClick={handleCloseNavs}
                >
                  <FontAwesomeIcon
                    icon={faHorseHead}
                    size="lg"
                    className="mr-2"
                  />
                  My Account
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full px-4 py-2 text-white bg-red-500 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeTop;
