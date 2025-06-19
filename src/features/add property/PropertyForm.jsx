"use client";

import { useNavigate } from "react-router-dom";
import { useHouses } from "../../contexts/HousesContext";
import { useState } from "react";
import { MapPin, Loader2, Home, AlertCircle } from "lucide-react";

function Form() {
  const { address, setAddress } = useHouses();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userAddress = address.countryName
    ? `${address.locality}, ${address.city}, ${address.countryName}`
    : "";

  function handleSubmit(e) {
    if (userAddress === "") {
      setError("This field is required");
      e.preventDefault();
      return;
    }
    navigate("/add-property/form-details");
  }

  function handleUserAddress(e) {
    e.preventDefault();

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Unable to retrieve your location. Please try again.");
      }
    );
  }

  async function getAddress(latitude, longitude) {
    console.log(latitude, longitude);
    try {
      setLoading(true);
      setError(""); // Clear any previous error
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
      );
      if (!res.ok) throw new Error("Failed to get address");

      const data = await res.json();
      setAddress(data);
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Failed to retrieve address. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-emerald-100">
            <Home className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Add Your Property
          </h1>
          <p className="max-w-md mx-auto text-lg text-gray-600">
            First, we need some details about your property. That way, we can
            tailor the property management experience to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
            <div className="px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-500">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-white">
                <MapPin className="w-6 h-6" />
                Property Location
              </h2>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <p className="leading-relaxed text-gray-700">
                  Enter the address of your property. It has to be an absolute
                  location, so use the button below to get your current address
                  automatically.
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      className="w-full px-4 py-4 font-medium text-gray-700 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white disabled:opacity-75"
                      type="text"
                      value={userAddress}
                      disabled
                      required
                      placeholder="Your property address will appear here..."
                    />
                    {userAddress && (
                      <div className="absolute transform -translate-y-1/2 right-4 top-1/2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 text-red-700 border border-red-200 rounded-lg bg-red-50">
                      <AlertCircle className="flex-shrink-0 w-5 h-5" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    onClick={handleUserAddress}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Getting your address...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5" />
                        Get Current Address
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg rounded-xl hover:from-emerald-600 hover:to-teal-600 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Continue to Property Details
            </button>
          </div>

          <div className="p-6 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="text-sm leading-relaxed text-gray-600">
                <strong className="text-gray-800">Terms & Conditions:</strong>{" "}
                By clicking "Continue to Property Details" above, I agree that I
                will provide accurate and non-discriminatory information and I
                will comply with the LandLords.com Terms and Conditions and the
                Add a Property Terms of Service.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddPropertyHeader() {
  return (
    <div className="mb-12 space-y-4 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
        <Home className="w-10 h-10 text-emerald-600" />
      </div>
      <h2 className="text-4xl font-bold leading-tight text-gray-900">
        Add Your Property
      </h2>
      <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
        First, we need some details about your property. That way, we can tailor
        the property management experience to you.
      </p>
    </div>
  );
}

export default Form;
