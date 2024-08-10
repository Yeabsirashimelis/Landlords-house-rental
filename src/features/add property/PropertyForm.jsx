import { useNavigate } from "react-router-dom";
import { useHouses } from "../../contexts/HousesContext";
import { useState } from "react";

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
    <form className="space-y-12" onSubmit={handleSubmit}>
      <div className="space-y-1 bg-white z-50 shadow-2xl px-4 py-6 rounded-md">
        <p>What kind of property is it?</p>
        <div className="flex gap-4">
          <div className="px-2 py-1 border rounded-md border-green-300">
            Single Family Home
          </div>
          <div className="px-2 py-1 border rounded-md border-green-300">
            Condo
          </div>
          <div className="px-2 py-1 border rounded-md border-green-300">
            Townhome
          </div>
          <div className="px-2 py-1 border rounded-md border-green-300">
            Apartment
          </div>
        </div>
      </div>
      <div className="space-y-2 bg-white z-50 shadow-2xl px-4 py-6 rounded-md">
        <p>
          Enter the Address of your property. It has to be an absolute location,
          so use the button below to get your address.
        </p>
        <div className="space-x-3">
          <input
            className="bg-green-200 w-[60%]"
            type="text"
            value={userAddress}
            disabled
            required
          />
          {error && (
            <div
              className=" w-[150px] text-xs items-center 
            flex justify-center bg-red-300 px-2 mt-1 mb-2 
            rounded-md"
            >
              {error}
            </div>
          )}
          <button
            className="px-2 py-1 border rounded-md border-green-300"
            onClick={handleUserAddress}
            disabled={loading}
          >
            {loading ? "Getting your address..." : "Get Address"}
          </button>
        </div>
      </div>

      <div>
        <button className="px-2 py-2 w-full mt-8 hover:scale-105 transition-all duration-100 border rounded-md border-green-300">
          Add Your Property
        </button>
      </div>

      <div className="space-y-2 bg-white z-50 px-4 py-6 rounded-md">
        By clicking "Add Your Property" above, I agree that I will provide
        accurate and non-discriminatory information and I will comply with the
        LandLords.com Terms and Conditions and the Add a Property Terms of
        Service. If you agree, just continue.
      </div>
    </form>
  );
}

export default Form;
