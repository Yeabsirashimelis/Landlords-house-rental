import {
  faCalendar,
  faCat,
  faCogs,
  faHome,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <div
      className="grid grid-cols-2 gap-4 
         text-xs lg:text-sm px-12 py-1 "
    >
      <div className="flex items-center  gap-2 bg-gray-100 px-4 py-2">
        <FontAwesomeIcon icon={faHome} />
        <p>Single Family Residence</p>
      </div>

      <div className="flex items-center  gap-4 bg-gray-100 px-4 py-2">
        <FontAwesomeIcon icon={faMoneyBill} />
        <p>Birr Deposit and Fees</p>
      </div>

      <div className="flex items-center  gap-4 bg-gray-100 px-4 py-2">
        <FontAwesomeIcon icon={faCalendar} />
        <p>
          Available on
          {availableDays.map((day, index) => (
            <span key={index}>
              {day}
              {index < availableDays.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>

      <div className="flex items-center  gap-4 bg-gray-100 px-4 py-2">
        <FontAwesomeIcon icon={faCat} />
        <p>{isPetAllowed ? "Pets Allowed" : "Pets Not Allowed"}</p>
      </div>

      {additionalFeatures.map((feature, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-100 gap-4 px-4 py-2"
        >
          <FontAwesomeIcon icon={faCogs} />
          <p>{feature}</p>
        </div>
      ))}
    </div>
  );
}

export default FeaturesAndFacts;
