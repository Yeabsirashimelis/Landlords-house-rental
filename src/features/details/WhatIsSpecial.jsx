import TextExpander from "../../customehooks/TextExpander";

function WhatIsSpecial({ home }) {
  const { description, leaseTerms, userId, isPetAllowed } = home;

  const descriptionLength = description.split(" ").length;
  const leaseTermsLength = leaseTerms.split(" ").length;

  return (
    <div className=" mx-auto mt-12 px-12 py-1">
      <p className="text-xl font-bold mt-12 px-8"> WHAT IS SPECIAL</p>

      <div className="bg-gray-100 px-8 py-8">
        {descriptionLength > 40 ? (
          <TextExpander className="text-sm lg:text-base" collapsedNumWords="40">
            {description}
          </TextExpander>
        ) : (
          <p>{description}</p>
        )}
      </div>

      <div className="bg-gray-100 px-8 py-8">
        <p className=" font-bold text-lg text-center">Lease Terms</p>
        {leaseTermsLength > 40 ? (
          <TextExpander className="text-sm lg:text-base" collapsedNumWords="40">
            {leaseTerms}
          </TextExpander>
        ) : (
          <p>{leaseTerms}</p>
        )}
      </div>

      {isPetAllowed && (
        <div className="mt-8 space-y-2">
          <div className="flex flex-col ">
            <p className="text-xl font-bold mt-12">PET POLICY</p>

            <p className=" font-extralight text-sm sm:text-base "></p>
          </div>

          {isPetAllowed && (
            <div className=" flex justify-around mt-8  mx-auto">
              <div className="flex flex-col justify-center flex-1 bg-gray-100 px-4 py-4">
                <h2 className=" text-center lg:text-xl">Pet policy</h2>
                <p className="font-light text-sm">
                  Pets are allowed. if there si any specification on pets just
                  look at what is special and lease terms
                </p>
              </div>

              <div className="flex justify-center flex-1">
                <img src="/pets.jpg" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WhatIsSpecial;
