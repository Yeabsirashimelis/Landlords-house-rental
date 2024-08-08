import { Link } from "react-router-dom";

function TipsForRenters() {
  return (
    <>
      <div
        className="flex justify-center mx-auto flex-col space-y-8
   md:space-y-0 md:flex-row md:gap-4 mt-16 sm:w-[90%] md:ml-[5%]"
      >
        <img
          src="h6.jpg"
          className="h-[300px] w-[300px]  sm:w-[90%] 
      sm:h-[90%] md:h-[250px] md:w-[250px] mx-auto"
        />
        <img src="h2.jpg" className="h-[250px] w-[250px] hidden md:block" />
        <img
          src="h3.jpg"
          className="h-[250px] w-[250px] mx-auto hidden  md:block"
        />
      </div>
      <div className="mt-12 bg-gray-100 py-6">
        <h2 className="flex justify-center mb-2 md:mb-0 text-xl md:w-[90%] lg:text-2xl font-bold">
          Tips for Renters
        </h2>

        <p className="text-sm sm:text-base   md:w-[70%] md:mx-auto ml-8 mr-8 text-left">
          Find answers to all of your renting questions with the best renter’s
          guide in the galaxy. Stay up-to-date using our tips and guides on rent
          payments, leasing, management solutions, and more.
        </p>
        <p
          className="text-sm text-green-500 hover:text-green-700 sm:text-base mt-2 md:w-[70%] 
        md:mx-auto ml-8 mr-8 text-left"
        >
          <Link to="/articles">Browse Articles</Link>
        </p>
      </div>
    </>
  );
}

export default TipsForRenters;
