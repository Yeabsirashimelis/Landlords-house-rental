import { Form, Outlet } from "react-router-dom";
import AddPropertyHeader from "../features/add property/AddPropertyHeader";
import PropertyForm from "../features/add property/PropertyForm";

function AddProperty() {
  return (
    <div className="flex flex-col justify-center px-6 py-6 space-y-6 bg-gray-100 sm:px-12">
      <AddPropertyHeader />
      <PropertyForm />
    </div>
  );
}

export default AddProperty;
