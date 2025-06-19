"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHouses } from "../../contexts/HousesContext";
import { useNavigate } from "react-router-dom";
import { createHome } from "../../services/HouseApi";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Ruler,
  FileText,
  DollarSign,
  Heart,
  FileCheck,
  Camera,
  Calendar,
  Star,
  Phone,
  Loader2,
  Check,
} from "lucide-react";

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

const stepIcons = [
  Home,
  Ruler,
  FileText,
  DollarSign,
  Heart,
  FileCheck,
  Camera,
  Calendar,
  Star,
  Phone,
];

const stepTitles = [
  "Property Title",
  "Property Size",
  "Description",
  "Pricing",
  "Pet Policy",
  "Lease Terms",
  "Media Upload",
  "Availability",
  "Features",
  "Contact Info",
];

function MainPropertyForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const { address } = useHouses();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

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

  const StepIcon = stepIcons[currentPage - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl px-6 py-8 mx-auto">
          <h1 className="text-2xl font-bold text-center text-white">
            Create Your Property Listing
          </h1>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-100">
                Step {currentPage} of {totalPages}
              </span>
              <span className="text-sm font-medium text-emerald-100">
                {Math.round((currentPage / totalPages) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-500/30">
              <div
                className="h-2 transition-all duration-500 ease-out bg-white rounded-full"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl px-6 py-12 mx-auto"
      >
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-full shadow-lg">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
              <StepIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">
              {stepTitles[currentPage - 1]}
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
          <div className="p-8 md:p-12">
            {currentPage === 1 && (
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                  <Home className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Give your property a name
                  </h2>
                  <p className="text-gray-600">
                    Choose a catchy title that will attract potential renters
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <input
                    {...register("title")}
                    className="w-full px-6 py-4 text-lg font-medium text-center text-gray-800 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                    type="text"
                    placeholder="e.g., Cozy Downtown Apartment"
                    required
                  />
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <Ruler className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Property Size Details
                  </h2>
                  <p className="text-gray-600">
                    Add or review details about your property's size
                  </p>
                </div>

                <div className="grid max-w-2xl gap-6 mx-auto md:grid-cols-3">
                  <div className="space-y-3">
                    <label
                      htmlFor="squareFeet"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Square Footage
                    </label>
                    <input
                      {...register("squareFeet")}
                      className="w-full px-4 py-3 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                      type="text"
                      id="squareFeet"
                      placeholder="e.g., 1200"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="bedRooms"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Bedrooms
                    </label>
                    <input
                      {...register("bedRooms")}
                      className="w-full px-4 py-3 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                      type="text"
                      id="bedRooms"
                      placeholder="e.g., 2"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="bathRooms"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Bathrooms
                    </label>
                    <input
                      {...register("bathRooms")}
                      className="w-full px-4 py-3 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                      type="text"
                      id="bathRooms"
                      placeholder="e.g., 1.5"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <FileText className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Describe Your Property
                  </h2>
                  <p className="max-w-2xl mx-auto text-gray-600">
                    Write several sentences describing the upgrades and
                    desirable features that will attract renters to your
                    property
                  </p>
                </div>
                <div className="max-w-3xl mx-auto">
                  <textarea
                    {...register("description")}
                    className="w-full px-6 py-4 transition-all duration-200 border-2 border-gray-200 resize-none bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                    rows={8}
                    placeholder="Example: Freshly painted home with new appliances and carpeting. Easy walking to public transit and a great neighborhood. Features include hardwood floors, updated kitchen with granite countertops, and a private balcony with city views."
                    required
                  />
                </div>
              </div>
            )}

            {currentPage === 4 && (
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Monthly Rent
                  </h2>
                  <p className="text-gray-600">Set your monthly rental price</p>
                </div>
                <div className="max-w-sm mx-auto">
                  <div className="relative">
                    <span className="absolute text-lg font-semibold text-gray-500 transform -translate-y-1/2 left-4 top-1/2">
                      ETB
                    </span>
                    <input
                      {...register("price")}
                      className="w-full py-4 pl-16 pr-6 text-lg font-semibold text-center text-gray-800 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                      type="text"
                      placeholder="15,000"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentPage === 5 && (
              <div className="space-y-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                  <Heart className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Pet Policy
                  </h2>
                  <p className="text-gray-600">
                    What's your policy regarding pets?
                  </p>
                </div>
                <div className="flex flex-col justify-center max-w-md gap-4 mx-auto sm:flex-row">
                  <label className="flex-1 cursor-pointer">
                    <input
                      {...register("isPetAllowed")}
                      type="radio"
                      value="true"
                      name="isPetAllowed"
                      className="sr-only"
                      required
                    />
                    <div className="p-6 transition-all duration-200 border-2 border-gray-200 rounded-xl hover:border-emerald-500 peer-checked:border-emerald-500 peer-checked:bg-emerald-50">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100">
                          <Check className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="font-semibold text-gray-800">
                          Pets Allowed
                        </span>
                      </div>
                    </div>
                  </label>

                  <label className="flex-1 cursor-pointer">
                    <input
                      {...register("isPetAllowed")}
                      type="radio"
                      value="false"
                      name="isPetAllowed"
                      className="sr-only"
                      required
                    />
                    <div className="p-6 transition-all duration-200 border-2 border-gray-200 rounded-xl hover:border-emerald-500 peer-checked:border-emerald-500 peer-checked:bg-emerald-50">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full">
                          <span className="text-xl font-bold text-red-600">
                            ×
                          </span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          No Pets
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {currentPage === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <FileCheck className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Lease Terms
                  </h2>
                  <p className="max-w-2xl mx-auto text-gray-600">
                    Share details that can be deal breakers, or deal makers, for
                    renters
                  </p>
                </div>
                <div className="max-w-3xl mx-auto">
                  <textarea
                    {...register("leaseTerms")}
                    className="w-full px-6 py-4 transition-all duration-200 border-2 border-gray-200 resize-none bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                    rows={8}
                    placeholder="Example: Owner pays for water. Renter is responsible for gas and electric. No smoking allowed. Small pets (up to 10kg) are allowed. 12-month lease minimum. Security deposit equal to one month's rent."
                    required
                  />
                </div>
              </div>
            )}

            {currentPage === 7 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <Camera className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Property Photos
                  </h2>
                  <p className="text-gray-600">
                    Upload high-quality photos of your property
                  </p>
                </div>
                <div className="max-w-2xl mx-auto">
                  <div className="p-8 text-center transition-all duration-200 border-2 border-gray-300 border-dashed bg-gray-50 rounded-xl hover:border-emerald-500">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <input
                      {...register("image")}
                      className="w-full"
                      type="file"
                      multiple
                      accept="image/*"
                    />
                  </div>
                  <div className="p-4 mt-4 border rounded-lg bg-emerald-50 border-emerald-200">
                    <p className="text-sm font-medium text-emerald-700">
                      📸 Pro tip: Upload photos of each room from the best
                      angles. Include any special features like pools, gardens,
                      or outdoor spaces.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 8 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <Calendar className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Availability Schedule
                  </h2>
                  <p className="text-gray-600">
                    When are you available to show the property?
                  </p>
                </div>
                <div className="max-w-3xl mx-auto">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
                    {days.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`p-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                          selectedDays.includes(day)
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPage === 9 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                    <Star className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Additional Features
                  </h2>
                  <p className="text-gray-600">
                    Select any additional features that apply to your property
                  </p>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {features.map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        className={`p-4 rounded-xl font-medium capitalize transition-all duration-200 transform hover:scale-105 ${
                          selectedFeatures.includes(feature)
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => handleFeatureClick(feature)}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentPage === 10 && (
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                  <Phone className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                  <p className="text-gray-600">
                    How can interested renters reach you?
                  </p>
                </div>
                <div className="max-w-sm mx-auto">
                  <input
                    {...register("phoneNumber")}
                    className="w-full px-6 py-4 font-medium text-center text-gray-800 transition-all duration-200 border-2 border-gray-200 bg-gray-50 rounded-xl focus:border-emerald-500 focus:bg-white"
                    type="text"
                    placeholder="+251 9XX XXX XXX"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentPage < totalPages ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:scale-105"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-8 py-3 font-semibold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Listing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Create Listing
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MainPropertyForm;
