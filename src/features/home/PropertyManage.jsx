function PropertyManage() {
  return (
    <div className="mt-16 pt-8 flex flex-col items-center justify-center border-t border-t-gray-200">
      <div>
        <h2 className="font-bold text-lg sm:text-xl text-center">
          The Perfect Place to Manage Your Property
        </h2>
        <p className="font-extralight text-sm sm:text-base text-center">
          Work with the best suite of property management tools on the market.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:w-[85%] md:w-[80%] mx-auto mt-8">
        <div className="flex flex-col justify-center bg-gray-100 px-4 py-4">
          <h2 className="font-bold text-lg lg:text-xl">
            Advertise Your Rental
          </h2>
          <p className="font-light text-sm mt-2">
            Connect with a lot of renters looking for new homes using our
            comprehensive marketing platform.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="src/images/property.jfif"
            className="object-contain w-full h-auto"
            alt="Advertise Your Rental"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="src/images/rented.jfif"
            className="object-contain w-full h-auto"
            alt="Lease 100% Online"
          />
        </div>
        <div className="flex flex-col justify-center bg-gray-100 px-4 py-4">
          <h2 className="font-bold text-lg lg:text-xl">Lease 100% Online</h2>
          <p className="font-light text-sm mt-2">
            Find your dream rental property. Bookmark properties and contact the
            owners all powered on a single platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyManage;
