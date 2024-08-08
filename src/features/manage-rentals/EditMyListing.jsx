import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { editHouse, getHomeById } from "../../services/HouseApi";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

function EditMyListing() {
  const navigate = useNavigate();
  const [listing, setlisting] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const { houseId } = useParams();
  const queryClient = useQueryClient();
  const {
    user: { id: myId },
  } = useAuth();

  const {
    data: myListing,
    isLoading: isLoadingMyListing,
    error: loadingMyListingError,
  } = useQuery({
    queryKey: ["myListings", houseId],
    queryFn: () => getHomeById(houseId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editHouse,
    onSuccess: () => {
      toast.success("The house is successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["myListings", houseId] });
      navigate("/manage-rentals/my-listings");
    },
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    if (myListing) {
      setValue("title", myListing.title);
      setValue("squareFeet", myListing.squareFeet);
      setValue("bedRooms", myListing.bedRooms);
      setValue("bathRooms", myListing.bathRooms);
      setValue("description", myListing.description);
      setValue("price", myListing.price);
      setValue("isPetAllowed", myListing.isPetAllowed);
      setValue("leaseTerms", myListing.leaseTerms);
      setValue("phoneNumber", myListing.phoneNumber);
      setSelectedDays(myListing.availableDays || []);
      setSelectedFeatures(myListing.AdditionalFeatures || []);
    }
  }, [myListing, setlisting]);

  function handleDayClick(day) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function handleFeatureClick(feature) {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  }

  function onSubmit(data) {
    const updatingData = {
      ...data,
      image: myListing.image,
      availableDays: selectedDays,
      AdditionalFeatures: selectedFeatures,
    };
    console.log(updatingData);
    mutate({ id: myListing.id, updatingData });
  }

  if (isLoadingMyListing) return <LoadingSpinner />;
  if (myListing?.userId !== myId)
    return (
      <p className="text-center bg-red-400 px-4 py-4">
        UNAUTORIZED ACCESS. YOU CAN ONLY UPDATE YOUR LISTINGS
      </p>
    );
  return (
    <div className=" absolute top-36 w-[99%] flex flex-col justify-center  mb-4 items-center z-10  ">
      <form
        className="space-y-8  text-gray-700 bg-gray-200 px-8 pb-8 rounded-lg shadow-md w-full max-w-2xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="bg-gray-800 mb-12  text-white px-4 py-1 w-full shadow-md">
            <button
              className="text-blue-300 hover:text-blue-400 font-semibold"
              onClick={() => navigate(-1)}
            >
              ⬅ Back
            </button>
          </div>
          <h2 className="font-extrabold text-xl text-center text-green-900">
            Let's Edit The Listing
          </h2>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Give your property a Title / Name</label>
          <input
            {...register("title")}
            className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
            type="text"
            id="title"
            required
          />
        </div>

        {/* Property Size */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">
            Add or review details about your property's size.
          </h2>
          <label htmlFor="squareFeet">Square Footage</label>
          <input
            {...register("squareFeet")}
            className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
            type="text"
            id="squareFeet"
            required
          />
          <label htmlFor="bedRooms" className="mt-4">
            Total bedrooms
          </label>
          <input
            {...register("bedRooms")}
            className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
            type="text"
            id="bedRooms"
            required
          />
          <label htmlFor="bathRooms" className="mt-4">
            Total bathrooms
          </label>
          <input
            {...register("bathRooms")}
            className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
            type="text"
            id="bathRooms"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Describe the property</h2>
          <p>
            Write several sentences describing the upgrades and desirable
            features that will attract renters to your property.
          </p>
          <textarea
            {...register("description")}
            className="outline-none focus:ring text-sm focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-2 h-48 rounded-md"
            type="text"
            placeholder="Example: Freshly painted home with new appliances and carpeting. Easy walking to public transit and a great neighborhood."
            required
          />
        </div>

        {/* Monthly Rent */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">How much is the monthly rent?</h2>
          <label htmlFor="price" className="text-sm">
            Monthly rent in birr
          </label>
          <input
            {...register("price")}
            className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
            type="text"
            id="price"
            required
          />
        </div>

        {/* Pet Policy */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">What's your pet policy?</h2>
          <div className="items-center space-x-2">
            <input
              {...register("isPetAllowed")}
              type="radio"
              id="petsAllowed"
              value="true"
              name="isPetAllowed"
              required
            />
            <label htmlFor="petsAllowed">Pets allowed</label>
          </div>
          <div className="items-center space-x-2">
            <input
              {...register("isPetAllowed")}
              type="radio"
              value="false"
              id="petsNotAllowed"
              name="isPetAllowed"
              required
            />
            <label htmlFor="petsNotAllowed">Pets not allowed</label>
          </div>
        </div>

        {/* Lease Terms */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">
            What should renters know about the lease terms?
          </h2>
          <p>
            Share details that can be deal breakers, or deal makers, for
            renters.
          </p>
          <textarea
            {...register("leaseTerms")}
            className="outline-none focus:ring text-sm focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-2 h-48 rounded-md"
            type="text"
            placeholder="Example: Owner pays for water. Renter is responsible for gas and electric. No smoking allowed. Small pets (up to 10kg) are allowed."
            required
          />
        </div>

        {/* Availability */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">
            When are you available to show the property?
          </h2>
          <label htmlFor="day" className="text-sm">
            Select your availability.
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Mondays",
              "Tuesdays",
              "Wednesdays",
              "Thursdays",
              "Fridays",
              "Saturdays",
              "Sundays",
            ].map((day) => (
              <button
                key={day}
                type="button"
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  selectedDays.includes(day) ? "bg-green-300" : "bg-gray-300"
                } text-black`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Additional Features</h2>
          <p>Select any additional features that apply to your property:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "parking",
              "AC",
              "heating",
              "laundry",
              "pool",
              "gym",
              "wifi",
              "balcony",
              "dishwasher",
              "elevator",
              "security",
              "wheelchair accessible",
              "garden",
              "fireplace",
              "bicycle storage",
              "storage unit",
              "concierge",
              "jacuzzi",
            ].map((feature) => (
              <button
                key={feature}
                type="button"
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  selectedFeatures.includes(feature)
                    ? "bg-green-300"
                    : "bg-gray-300"
                } text-black`}
                onClick={() => handleFeatureClick(feature)}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Contact Information</h2>
          <label htmlFor="phoneNumber" className="text-sm">
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
            type="text"
            id="phoneNumber"
            required
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMyListing;
