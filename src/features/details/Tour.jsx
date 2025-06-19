"use client";

import { Phone, Calendar, MessageCircle } from "lucide-react";
import { formatDate } from "./utils/helpers";
import { useNavigate } from "react-router-dom";
import { getLister } from "../../services/HouseApi";
import { useQuery } from "@tanstack/react-query";

function Tour({ home, setIsTourFormOpened }) {
  const { id, phoneNumber, created_at, title, userId } = home;
  const createdAt = formatDate(created_at);
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ["listerName"],
    queryFn: () => getLister(userId),
  });

  function handleOpenMessagePage() {
    navigate(`/manage-rentals/messages/${userId}/${id}`);
  }

  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
      <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <h3 className="text-xl font-bold text-center text-white">
          Contact this Property
        </h3>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-green-600 shadow-lg hover:bg-green-700 rounded-xl hover:shadow-xl"
            onClick={() => setIsTourFormOpened(true)}
          >
            <Calendar className="w-5 h-5" />
            Request a tour
          </button>
          <button
            className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-green-600 transition-colors duration-200 border-2 border-green-600 hover:bg-green-50 rounded-xl"
            onClick={handleOpenMessagePage}
          >
            <MessageCircle className="w-5 h-5" />
            Send message
          </button>
        </div>

        <div className="hidden sm:block">
          <div className="flex items-center justify-center gap-3 py-4 border-t border-gray-200">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-lg font-semibold text-gray-700">{phoneNumber}</p>
          </div>
        </div>

        <div className="hidden p-4 text-center border border-green-200 sm:block bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
          <p className="mb-1 text-sm text-gray-600">Listed on</p>
          <p className="font-semibold text-gray-800">{createdAt}</p>
        </div>
      </div>
    </div>
  );
}

export default Tour;
