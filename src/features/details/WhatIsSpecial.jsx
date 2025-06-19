import TextExpander from "../../customehooks/TextExpander";
import { FileText, Shield, Heart } from "lucide-react";

function WhatIsSpecial({ home }) {
  const { description, leaseTerms, userId, isPetAllowed } = home;

  const descriptionLength = description.split(" ").length;
  const leaseTermsLength = leaseTerms.split(" ").length;

  return (
    <div className="max-w-6xl px-6 mx-auto mt-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-600 shadow-lg rounded-xl">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">WHAT IS SPECIAL</h2>
      </div>

      <div className="space-y-8">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <h3 className="text-xl font-semibold text-gray-800">
              Property Description
            </h3>
          </div>
          <div className="p-6">
            {descriptionLength > 40 ? (
              <TextExpander
                className="leading-relaxed text-gray-700"
                collapsedNumWords="40"
              >
                {description}
              </TextExpander>
            ) : (
              <p className="leading-relaxed text-gray-700">{description}</p>
            )}
          </div>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Lease Terms</h3>
          </div>
          <div className="p-6">
            {leaseTermsLength > 40 ? (
              <TextExpander
                className="leading-relaxed text-gray-700"
                collapsedNumWords="40"
              >
                {leaseTerms}
              </TextExpander>
            ) : (
              <p className="leading-relaxed text-gray-700">{leaseTerms}</p>
            )}
          </div>
        </div>

        {isPetAllowed && (
          <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <Heart className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                PET POLICY
              </h3>
            </div>
            <div className="p-6">
              <div className="grid items-center gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-green-700 bg-green-100 rounded-full">
                    <Heart className="w-5 h-5" />
                    <span>Pet Friendly</span>
                  </div>
                  <p className="leading-relaxed text-gray-600">
                    Pets are allowed. If there are any specifications on pets,
                    please check the property description and lease terms above
                    for more details.
                  </p>
                </div>
                <div className="flex justify-center">
                  <img
                    src="/pets.jpg"
                    alt="Pet friendly"
                    className="h-auto max-w-full shadow-lg rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WhatIsSpecial;
