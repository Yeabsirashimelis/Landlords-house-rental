"use client";

import {
  User,
  Mail,
  MapPin,
  Shield,
  Edit3,
  Camera,
  Star,
  Home,
  Calendar,
  Badge,
  Crown,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

function AccountMain() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { id, userName, email, userType, gender, address } = user;

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "landlord":
        return "from-emerald-500 to-teal-600";
      case "tenant":
        return "from-blue-500 to-indigo-600";
      case "agent":
        return "from-purple-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getUserTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "landlord":
        return <Home className="w-4 h-4" />;
      case "tenant":
        return <User className="w-4 h-4" />;
      case "agent":
        return <Crown className="w-4 h-4" />;
      default:
        return <Badge className="w-4 h-4" />;
    }
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="mb-8 overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col -mt-16 sm:flex-row sm:items-end sm:gap-6">
              <div className="relative">
                <div className="flex items-center justify-center w-32 h-32 border-4 border-white shadow-xl bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl">
                  <span className="text-3xl font-bold text-white">
                    {getInitials(userName)}
                  </span>
                </div>
                <button className="absolute flex items-center justify-center w-10 h-10 transition-colors duration-200 bg-white border border-gray-200 rounded-full shadow-lg -bottom-2 -right-2 hover:bg-gray-50">
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 mt-4 sm:mt-0 sm:mb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                      Hello, {userName || "User"}
                      <span className="ml-3 text-lg">👋</span>
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Badge className="w-4 h-4" />
                        <span className="text-sm font-medium">ID: {id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Member since 2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getUserTypeColor(
                        userType
                      )} text-white rounded-full text-sm font-semibold shadow-lg`}
                    >
                      {getUserTypeIcon(userType)}
                      {userType || "User"}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200">
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Properties Listed</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Profile Information
          </h2>
          <p className="mt-1 text-gray-600">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <User className="w-5 h-5 text-blue-600" />
                Personal Details
              </h3>

              <div className="space-y-4">
                <div className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={userName || ""}
                      disabled
                      className="block w-full py-3 pl-10 pr-3 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email || ""}
                      disabled
                      className="block w-full py-3 pl-10 pr-3 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={gender || ""}
                      disabled
                      className="block w-full py-3 pl-10 pr-3 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Shield className="w-5 h-5 text-emerald-600" />
                Account Details
              </h3>

              <div className="space-y-4">
                <div className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Home className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={userType || ""}
                      disabled
                      className="block w-full py-3 pl-10 pr-3 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={address || ""}
                      disabled
                      className="block w-full py-3 pl-10 pr-3 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Badge className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={id || ""}
                      disabled
                      className="block w-full py-3 pl-10 pr-3 font-medium text-gray-900 transition-all duration-200 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-6 mt-8 border-t border-gray-100 sm:flex-row">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg">
              <Edit3 className="w-5 h-5" />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-4">
        <button className="p-4 transition-all duration-200 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl group">
          <Link to="/manage-rentals/my-listings">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 transition-transform duration-200 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 group-hover:scale-110">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">My Properties</p>
                <p className="text-sm text-gray-600">Manage listings</p>
              </div>
            </div>
          </Link>
        </button>

        <button className="p-4 transition-all duration-200 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl group">
          <Link to="/manage-rentals/messages">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 transition-transform duration-200 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:scale-110">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Messages</p>
                <p className="text-sm text-gray-600">View conversations</p>
              </div>
            </div>
          </Link>
        </button>

        <button className="p-4 transition-all duration-200 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl group">
          <Link to="/my-bookmarks">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 transition-transform duration-200 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 group-hover:scale-110">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Bookmarks</p>
                <p className="text-sm text-gray-600">View your bookmarks</p>
              </div>
            </div>
          </Link>
        </button>

        {/*
        <button className="p-4 transition-all duration-200 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl group">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 transition-transform duration-200 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 group-hover:scale-110">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Settings</p>
              <p className="text-sm text-gray-600">Account preferences</p>
            </div>
          </div>
        </button> */}
      </div>
    </div>
  );
}

export default AccountMain;
