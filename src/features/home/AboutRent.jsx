import abtImage from "/src/images/aboutrent.jfif";

function AboutRent() {
  return (
    <div className="w-[80%] mx-auto mt-12 lg:grid lg:grid-cols-2 lg:h-screen lg:gap-4">
      <div className="relative w-full h-96 lg:h-auto">
        <img
          src={abtImage}
          alt="About Rent"
          layout="fill"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="bg-green-700 text-gray-50 px-8 py-12 lg:py-2 lg:px-1 lg:h-auto flex items-center justify-center">
        <div className="text-center lg:text-left lg:w-1/2">
          <h2 className="font-bold text-lg md:text-xl">
            The Most Rental Listings
          </h2>
          <p className="font-extralight text-sm sm:text-base mt-2">
            Choose from a lot of apartments, houses, condos, and townhouses for
            Rent
          </p>
          <div className="flex flex-col items-center lg:items-start mt-8 space-y-4">
            <div className="flex flex-col  p-4">
              <h2 className="font-bold text-lg lg:text-xl">
                Renting Made Simple
              </h2>
              <p className="font-light text-sm mt-2">
                Browse the highest quality listings, message online, and find
                your comfortable place without having to move anywhere.
              </p>
              <p className="text-red-900 font-bold mt-2">Find Out More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutRent;
