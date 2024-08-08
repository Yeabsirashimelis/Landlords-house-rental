function DeleteAccount() {
  return (
    <div
      className="space-y-8 mt-12 border-2 
      w-[80%] md:w-[70%] lg:w-[60%] mx-auto 
      border-gray-300 py-8 rounded-3xl bg-white shadow-lg text-gray-600 mb-24"
    >
      <div className="space-y-2 px-4">
        <h2 className="font-extrabold text-xl text-red-700">
          Delete Your Account
        </h2>
        <p className="text-sm">
          Deleting your account will permanently remove all your data. Make sure
          to backup any important information before proceeding.
        </p>
      </div>

      <div className="flex gap-4 items-center ml-4 px-4">
        <input type="checkbox" className="form-checkbox text-red-700" />
        <p className="text-sm">
          I understand the consequences and want to proceed.
        </p>
      </div>

      <div className="flex justify-end mr-12 mt-6">
        <button className="bg-red-700 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-800">
          DELETE
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
