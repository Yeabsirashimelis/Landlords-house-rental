"use client";

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Bell, HelpCircle } from "lucide-react";

function AccountTop() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md border-gray-200/50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleClick}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 transition-all duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="font-medium">Back</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-900">My Account</h1>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 transition-all duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 transition-all duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 transition-all duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountTop;
