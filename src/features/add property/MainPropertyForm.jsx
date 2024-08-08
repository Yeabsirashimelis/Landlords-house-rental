import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHouses } from "../../contexts/HousesContext";
import { useNavigate } from "react-router-dom";
import { createHome } from "../../services/HouseApi";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const days = [
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays",
  "Sundays",
];

const features = [
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
];

function MainPropertyForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { address } = useHouses();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  useEffect(() => {
    if (!address.countryName) {
      navigate("/add-property");
    }
  }, [address, navigate]);

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

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createHome,
    onSuccess: () => {
      toast.success("The house is successfully created for Rent");
      queryClient.invalidateQueries({ queryKey: ["houses"] });
      reset();
      navigate("/manage-rentals/my-listings");
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const newHouse = {
      ...data,
      availableDays: selectedDays,
      address: address,
      isPetAllowed: data.isPetAllowed === "true",
      userId: user.id,
      AdditionalFeatures: selectedFeatures,
    };

    mutate(newHouse);
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols(auto, 1fr,auto) space-y-8 text-gray-700 h-screen bg-gray-100"
    >
      <h2 className="bg-green-900 font-extralight h-16 flex justify-center items-center text-xl px-2 py-8 text-center text-gray-50">
        Let's start creating your listing
      </h2>
      <div className="space-y-8 flex flex-col justify-center w-[100%] sm:w-[80%] md:w-[70%] lg:w-[50%] mx-auto">
        {currentPage === 1 && (
          <div className="flex flex-col items-center gap-1 px-16 py-16 bg-white rounded-md shadow-md">
            <label htmlFor="title">Give your property a Title / Name</label>
            <input
              {...register("title")}
              className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
              type="text"
              id="title"
              required
            />
          </div>
        )}

        {currentPage === 2 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
            <h2 className="font-bold text-lg">
              Add or review details about your property's size.
            </h2>

            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="squareFeet">Square Footage</label>
              <input
                {...register("squareFeet")}
                className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
                type="text"
                id="squareFeet"
                required
              />
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="bedRooms">Total bedrooms</label>
              <input
                {...register("bedRooms")}
                className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
                type="text"
                id="bedRooms"
                required
              />
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <label htmlFor="bathRooms">Total bathrooms</label>
              <input
                {...register("bathRooms")}
                className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
                type="text"
                id="bathRooms"
                required
              />
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
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
        )}

        {currentPage === 4 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
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
        )}

        {currentPage === 5 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
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
        )}

        {currentPage === 6 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
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
        )}
        {currentPage === 7 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
            <h2 className="font-bold text-lg">Media</h2>
            <p>Insert high quality photos of your property</p>
            <p className="text-sm mt-2 text-green-700">
              Enter as many photos as you can. Please capture the photo of each
              and every room of the house from a better angle. Any additional
              things like a swimming pool and garden, backyard, or something
              like those.
            </p>

            <input
              {...register("image")}
              className="outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 w-full bg-gray-50 border border-green-400 px-2 py-1 rounded-md"
              type="file"
              multiple
            />
          </div>
        )}

        {currentPage === 8 && (
          <div className="flex flex-col gap-2 px-16 py-16 bg-white rounded-md shadow-md">
            <h2 className="font-bold text-lg">
              When are you available to show the property?
            </h2>
            <label htmlFor="day" className="text-sm">
              Select your availability.
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    selectedDays.includes(day)
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentPage === 9 && (
          <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
            <h2 className="font-bold text-lg">Additional Features</h2>
            <p>Select any additional features that apply to your property:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    selectedFeatures.includes(feature)
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                  onClick={() => handleFeatureClick(feature)}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 px-16 py-16 bg-white rounded-md shadow-md">
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

        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Next
            </button>
          )}
          {currentPage === totalPages && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-600"
              disabled={isPending}
            >
              {isPending ? "Submitting" : "Submit"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default MainPropertyForm;
