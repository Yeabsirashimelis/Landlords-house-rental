import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessage, sendMessage } from "../../services/MesssagesApi";
import { getHomeById, getLister } from "../../services/HouseApi";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";

const MessageDetailPage = () => {
  const { userId: receiverId, houseId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();
  const {
    user: { id: senderId },
  } = useAuth();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["lister", receiverId],
    queryFn: () => getLister(receiverId),
  });

  const { data: home, isLoading: isLoadingHome } = useQuery({
    queryKey: ["home", houseId],
    queryFn: () => getHomeById(houseId),
  });

  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages", houseId, senderId, receiverId],
    queryFn: () => getMessage(houseId, senderId, receiverId),
  });

  async function handleSendMessage() {
    // Determine if the sender is the first to send a message
    const messageToSend = {
      message: newMessage,
      houseId: messages.length === 0 ? home?.id : houseId, // Use receiver's house ID if first message
      userId: receiverId, // receiver
      senderId,
      messageSender: "me",
    };
    await sendMessage(messageToSend);
    setNewMessage("");
    queryClient.invalidateQueries(["messages", houseId, senderId, receiverId]);
  }

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  if (isLoadingUser || isLoadingHome || isLoadingMessages)
    return <LoadingSpinner />;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center p-4 bg-white shadow-md border-b">
        <img
          src="/a.jpg"
          className="w-16 h-16 rounded-md object-cover mr-4"
          alt="User"
        />
        <div>
          <h2 className="text-lg font-medium">{user?.userName}</h2>
          <p className="text-sm text-gray-500">{home?.title}</p>
          <p className="text-sm text-gray-500">
            {home?.address.city}, {home?.address.countryName}
          </p>
          <p className="text-sm text-gray-500">
            {`${home?.bedRooms} Bedrooms, ${home?.bathRooms} Bathrooms, ${home?.squareFeet} sqfeet, ${home?.price} Br`}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.senderId === senderId ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.senderId === senderId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 border-t flex items-center space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          disabled={!newMessage.length}
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageDetailPage;
