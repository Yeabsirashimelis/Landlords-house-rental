import { Form, Outlet } from "react-router-dom";
import AddPropertyHeader from "../features/add property/AddPropertyHeader";
import PropertyForm from "../features/add property/PropertyForm";

function AddProperty() {
  return (
    <div className="flex flex-col space-y-6 justify-center  bg-gray-100 px-6 sm:px-12 py-6">
      <AddPropertyHeader />
      <PropertyForm />
    </div>
  );
}

export default AddProperty;
