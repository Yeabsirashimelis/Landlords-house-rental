import {
  faAddressBook,
  faHome,
  faHorseHead,
  faMailBulk,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AccountMain() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, userName, email, userType, gender, address } = user;

  return (
    <div className="text-gray-800 bg-gray-100 min-h-screen p-6 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-extrabold text-green-700">
          Hello {userName}
        </div>
        <div className="text-sm font-medium bg-green-400 text-white px-3 py-1 rounded-full">
          Your ID: {id}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <FontAwesomeIcon
          icon={faHorseHead}
          style={{
            height: "70px",
            color: "whitesmoke",
            backgroundColor: "#1F2937",
            padding: "16px",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 p-2 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-white" />
              </div>
              <div className="text-sm font-medium">User Name</div>
            </div>
            <input
              disabled
              value={userName}
              className="bg-gray-200 text-center rounded-md px-4 py-2 font-bold outline-none"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 p-2 rounded-full">
                <FontAwesomeIcon icon={faMailBulk} className="text-white" />
              </div>
              <div className="text-sm font-medium">E-mail</div>
            </div>
            <input
              disabled
              value={email}
              className="bg-gray-200 text-center rounded-md px-4 py-2 font-bold outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 p-2 rounded-full">
                <FontAwesomeIcon icon={faUser} className="text-white" />
              </div>
              <div className="text-sm font-medium">Gender</div>
            </div>
            <input
              disabled
              value={gender}
              className="bg-gray-200 text-center rounded-md px-4 py-2 font-bold outline-none"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 p-2 rounded-full">
                <FontAwesomeIcon icon={faHome} className="text-white" />
              </div>
              <div className="text-sm font-medium">User Type</div>
            </div>
            <input
              disabled
              value={userType}
              className="bg-gray-200 text-center rounded-md px-4 py-2 font-bold outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-600 p-2 rounded-full">
                <FontAwesomeIcon icon={faAddressBook} className="text-white" />
              </div>
              <div className="text-sm font-medium">Address</div>
            </div>
            <input
              disabled
              value={address}
              className="bg-gray-200 text-center rounded-md px-4 py-2 font-bold outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-green-700 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-green-800">
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountMain;
