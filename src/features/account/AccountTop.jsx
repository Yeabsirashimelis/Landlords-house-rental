import { useNavigate } from "react-router-dom";

function AccountTop() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <button
        className="text-blue-300 hover:text-blue-400 font-semibold"
        onClick={handleClick}
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default AccountTop;
