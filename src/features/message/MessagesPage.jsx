import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEveryOneITalk } from "../../services/MesssagesApi";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getLister } from "../../services/HouseApi";

const MessagesPage = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const {
    user: { id: myId },
  } = useAuth();

  const { data: everyMessageIdo, isLoading: isLoadingEveryMessagesIdo } =
    useQuery({
      queryKey: ["everyMessages", myId],
      queryFn: () => getEveryOneITalk(myId),
    });

  useEffect(() => {
    if (everyMessageIdo && everyMessageIdo.length > 0) {
      const contactsMap = new Map();

      everyMessageIdo.forEach((message) => {
        const { userId: receiverId, senderId, houseId } = message;

        // Add the receiver as a contact if they are not already in the list
        if (receiverId !== myId) {
          if (!contactsMap.has(receiverId)) {
            contactsMap.set(receiverId, {
              userId: receiverId,
              houseId,
              userName: "", // will be populated later
              messages: [message],
            });
          } else {
            contactsMap.get(receiverId).messages.push(message);
          }
        }

        // Add the sender as a contact if they are not already in the list
        if (senderId !== myId) {
          if (!contactsMap.has(senderId)) {
            contactsMap.set(senderId, {
              userId: senderId,
              houseId,
              userName: "", // will be populated later
              messages: [message],
            });
          } else {
            contactsMap.get(senderId).messages.push(message);
          }
        }
      });

      const contactsArray = Array.from(contactsMap.values());
      setContacts(contactsArray);

      // Fetch user details for each contact
      contactsArray.forEach(async (contact) => {
        const userDetails = await getLister(contact.userId);
        setContacts((prevContacts) =>
          prevContacts.map((c) =>
            c.userId === contact.userId
              ? { ...c, userName: userDetails.userName }
              : c
          )
        );
      });
    }
  }, [everyMessageIdo, myId]);

  const handleContactClick = (contact) => {
    navigate(`/manage-rentals/messages/${contact.userId}/${contact.houseId}`);
  };

  if (isLoadingEveryMessagesIdo) return <LoadingSpinner />;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar for Contacts */}
      <aside className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Contacts</h2>
        {contacts.length === 0 ? (
          <p>No contacts yet</p>
        ) : (
          <ul>
            {contacts.map((contact) => (
              <li
                key={contact.userId}
                className="p-2 mb-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                onClick={() => handleContactClick(contact)}
              >
                <div className="flex gap-4 items-center">
                  <img
                    src="/a.jpg"
                    className="rounded-full h-16 w-16"
                    alt="User"
                  />
                  <p className="font-semibold">
                    {contact.userName || "Loading..."}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Right Side - Chat Area */}
      <div className="flex-1 bg-white flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default MessagesPage;
