import { Calendar, PawPrint, Settings, Home, DollarSign } from "lucide-react";

function FeaturesAndFacts({ home }) {
  const {
    address: { city, countryName, locality, principalSubdivision },
    bathRooms,
    bedRooms,
    description,
    isPetAllowed,
    leaseTerms,
    phoneNumber,
    price,
    squareFeet,
    title,
    availableDays,
    AdditionalFeatures: additionalFeatures,
  } = home;

  const features = [
    {
      icon: Home,
      text: "Single Family Residence",
      color: "text-blue-600",
    },
    {
      icon: DollarSign,
      text: "Birr Deposit and Fees",
      color: "text-green-600",
    },
    {
      icon: Calendar,
      text: `Available on ${availableDays.join(", ")}`,
      color: "text-purple-600",
    },
    {
      icon: PawPrint,
      text: isPetAllowed ? "Pets Allowed" : "Pets Not Allowed",
      color: isPetAllowed ? "text-emerald-600" : "text-red-500",
    },
  ];

  return (
    <div className="max-w-6xl px-6 py-8 mx-auto">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-6 py-4 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
          >
            <div className={`p-2 rounded-lg bg-gray-50 ${feature.color}`}>
              <feature.icon className="w-5 h-5" />
            </div>
            <p className="font-medium text-gray-700">{feature.text}</p>
          </div>
        ))}

        {additionalFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-6 py-4 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
          >
            <div className="p-2 text-indigo-600 rounded-lg bg-gray-50">
              <Settings className="w-5 h-5" />
            </div>
            <p className="font-medium text-gray-700">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesAndFacts;
