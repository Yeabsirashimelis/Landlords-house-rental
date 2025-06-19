"use client";

import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEveryOneITalk } from "../../services/MesssagesApi";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { getLister } from "../../services/HouseApi";
import {
  MessageCircle,
  Search,
  Users,
  Clock,
  ChevronRight,
  User,
  HomeIcon,
  Menu,
  X,
} from "lucide-react";

const MessagesPage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user: { id: myId },
  } = useAuth();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
              lastMessage: message,
              lastMessageTime: message.createdAt || new Date().toISOString(),
            });
          } else {
            const contact = contactsMap.get(receiverId);
            contact.messages.push(message);
            // Update last message if this one is newer
            if (
              new Date(message.createdAt || new Date()) >
              new Date(contact.lastMessageTime)
            ) {
              contact.lastMessage = message;
              contact.lastMessageTime =
                message.createdAt || new Date().toISOString();
            }
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
              lastMessage: message,
              lastMessageTime: message.createdAt || new Date().toISOString(),
            });
          } else {
            const contact = contactsMap.get(senderId);
            contact.messages.push(message);
            // Update last message if this one is newer
            if (
              new Date(message.createdAt || new Date()) >
              new Date(contact.lastMessageTime)
            ) {
              contact.lastMessage = message;
              contact.lastMessageTime =
                message.createdAt || new Date().toISOString();
            }
          }
        }
      });

      const contactsArray = Array.from(contactsMap.values());
      // Sort by last message time
      contactsArray.sort(
        (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );
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

  // Extract selected contact ID from URL
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const userIdFromPath = pathParts[pathParts.length - 2];
    if (userIdFromPath && userIdFromPath !== "messages") {
      setSelectedContactId(userIdFromPath);
      // On mobile, close sidebar when a chat is selected
      if (isMobile) {
        setIsMobileSidebarOpen(false);
      }
    } else {
      setSelectedContactId(null);
    }
  }, [location.pathname, isMobile]);

  const handleContactClick = (contact) => {
    setSelectedContactId(contact.userId);
    navigate(`/manage-rentals/messages/${contact.userId}/${contact.houseId}`);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (!message) return "";
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  const isInChatView = selectedContactId && isMobile;
  const showContactsList = !isInChatView;

  if (isLoadingEveryMessagesIdo) return <LoadingSpinner />;

  return (
    <div className="relative flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Contacts Sidebar */}
      <aside
        className={`
        ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
        ${
          isMobile && !isMobileSidebarOpen
            ? "-translate-x-full"
            : "translate-x-0"
        }
        ${isMobile ? "w-full" : "w-80"}
        ${
          showContactsList && !isMobile
            ? "block"
            : isMobile
            ? "block"
            : "hidden lg:block"
        }
        bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
      `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-500">
                  {contacts.length} conversations
                </p>
              </div>
            </div>

            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 px-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No conversations yet
              </h3>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? "No conversations match your search."
                  : "Start messaging property owners or renters."}
              </p>
            </div>
          ) : (
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.userId}
                  className={`p-4 mb-1 cursor-pointer rounded-xl transition-all duration-200 hover:bg-gray-50 group active:bg-gray-100 ${
                    selectedContactId === contact.userId
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
                        {contact.userName ? (
                          <span className="text-sm font-semibold text-white">
                            {contact.userName.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {contact.userName || "Loading..."}
                        </h3>
                        <span className="flex items-center flex-shrink-0 gap-1 ml-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTime(contact.lastMessageTime)}
                        </span>
                      </div>
                      <p className="mb-1 text-sm text-gray-600 truncate">
                        {truncateMessage(contact.lastMessage?.message)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <HomeIcon className="w-3 h-3" />
                        <span>Property Discussion</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400 transition-colors duration-200 group-hover:text-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <div
        className={`
        flex-1 bg-white flex flex-col
        ${isMobile && !selectedContactId ? "hidden" : "flex"}
      `}
      >
        {/* Mobile: Show contacts button when in chat */}
        {isMobile && selectedContactId && (
          <div className="p-2 border-b border-gray-200 lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 transition-all duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-medium">Conversations</span>
            </button>
          </div>
        )}

        {/* Chat Content */}
        {selectedContactId ? (
          <Outlet />
        ) : (
          <div className="flex items-center justify-center flex-1 bg-gray-50">
            <div className="max-w-md px-6 mx-auto text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl">
                <MessageCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Welcome to Messages
              </h2>
              <p className="mb-6 text-gray-600">
                Select a conversation from the sidebar to start messaging with
                property owners and renters.
              </p>
              {isMobile && (
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700"
                >
                  <MessageCircle className="w-5 h-5" />
                  View Conversations
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
