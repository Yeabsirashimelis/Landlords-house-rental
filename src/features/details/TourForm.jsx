import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function TourForm({ home, setIsTourFormOpened }) {
  const { title } = home;

  function handleCloseForm() {
    setIsTourFormOpened(false);
  }

  return (
    <div className=" fixed inset-0 z-[9998] bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleCloseForm}
        >
          <FontAwesomeIcon icon={faClose} style={{ height: "22px" }} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <form className="flex flex-col space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name*
              </label>
              <input
                type="text"
                placeholder="First Name"
                className=" mt-1 block w-full  rounded-md shadow-sm
                 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none  border px-4  py-1 border-gray-300"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name*
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="mt-1 block outline-none  border px-4  py-1  w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address*
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="mt-1 outline-none  border px-4  py-1  block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Tour Date*
              </label>
              <input
                type="date"
                className="mt-1 outline-none  border px-4  py-1  block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone*
              </label>
              <input
                type="tel"
                placeholder="094-211-0161"
                className="mt-1   border px-4  py-1 block w-full border-gray-300 rounded-md shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value="I would like to schedule a tour."
              className="mt-1 outline-none  border px-4  py-1  block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md
             shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2
              focus:ring-green-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default TourForm;
