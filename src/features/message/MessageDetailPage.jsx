"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessage, sendMessage } from "../../services/MesssagesApi";
import { getHomeById, getLister } from "../../services/HouseApi";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../ui/LoadingSpinner";
import {
  ArrowLeft,
  Send,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Phone,
  MoreVertical,
  ImageIcon,
  Smile,
  Paperclip,
  User,
  HomeIcon,
  CheckCheck,
  MessageCircle,
  Info,
} from "lucide-react";

const MessageDetailPage = () => {
  const { userId: receiverId, houseId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    user: { id: senderId },
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
    if (!newMessage.trim()) return;

    setIsTyping(true);
    const messageToSend = {
      message: newMessage,
      houseId: messages.length === 0 ? home?.id : houseId,
      userId: receiverId,
      senderId,
      messageSender: "me",
    };

    try {
      await sendMessage(messageToSend);
      setNewMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      queryClient.invalidateQueries([
        "messages",
        houseId,
        senderId,
        receiverId,
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsTyping(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    if (isMobile) {
      navigate("/manage-rentals/messages");
    } else {
      navigate("/manage-rentals/messages");
    }
  };

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  if (isLoadingUser || isLoadingHome || isLoadingMessages)
    return <LoadingSpinner />;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0 gap-3 lg:gap-4">
            <button
              onClick={handleBack}
              className="flex-shrink-0 p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center flex-1 min-w-0 gap-3">
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-purple-500">
                  {user?.userName ? (
                    <span className="text-sm font-semibold text-white lg:text-base">
                      {user.userName.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="w-5 h-5 text-white lg:w-6 lg:h-6" />
                  )}
                </div>
                <div className="absolute w-3 h-3 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1 lg:w-4 lg:h-4"></div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-gray-900 truncate lg:text-lg">
                  {user?.userName}
                </h2>
                <p className="text-xs text-gray-500 lg:text-sm">Active now</p>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0 gap-1 lg:gap-2">
            <button
              onClick={() => setShowPropertyInfo(!showPropertyInfo)}
              className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <Info className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Info Card - Collapsible on mobile */}
      {home && (showPropertyInfo || !isMobile) && (
        <div className="p-3 mx-4 mt-3 border border-blue-100 lg:mx-6 lg:mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl lg:rounded-2xl lg:p-4">
          <div className="flex items-start gap-3 lg:gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 lg:rounded-xl">
              <HomeIcon className="w-6 h-6 text-white lg:w-8 lg:h-8" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="mb-1 text-sm font-semibold text-gray-900 truncate lg:text-base">
                {home.title}
              </h3>
              <div className="flex items-center gap-1 mb-2 text-xs text-gray-600 lg:text-sm">
                <MapPin className="flex-shrink-0 w-3 h-3 lg:w-4 lg:h-4" />
                <span className="truncate">
                  {home.address?.city}, {home.address?.countryName}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 lg:gap-4 lg:text-sm">
                <div className="flex items-center gap-1">
                  <Bed className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>{home.bedRooms} beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>{home.bathRooms} baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>{home.squareFeet} sqft</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-1 text-base font-bold text-gray-900 lg:text-lg">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-sm lg:text-base">
                  {formatCurrency(home.price)}
                </span>
              </div>
              <p className="text-xs text-gray-500 lg:text-sm">per month</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto lg:px-6 lg:py-4 lg:space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Start the conversation
            </h3>
            <p className="max-w-sm text-sm text-gray-500">
              Send a message to {user?.userName} about the property "
              {home?.title}"
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMyMessage = message.senderId === senderId;
            const showAvatar =
              index === 0 || messages[index - 1]?.senderId !== message.senderId;

            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  isMyMessage ? "justify-end" : "justify-start"
                }`}
              >
                {!isMyMessage && showAvatar && (
                  <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full lg:w-8 lg:h-8 bg-gradient-to-br from-gray-400 to-gray-600">
                    <span className="text-xs font-semibold text-white">
                      {user?.userName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}

                {!isMyMessage && !showAvatar && <div className="w-6 lg:w-8" />}

                <div
                  className={`max-w-[280px] lg:max-w-xs xl:max-w-md ${
                    isMyMessage ? "order-1" : ""
                  }`}
                >
                  <div
                    className={`px-3 py-2 lg:px-4 lg:py-2 rounded-2xl text-sm lg:text-base ${
                      isMyMessage
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-900 rounded-bl-md"
                    }`}
                  >
                    <p className="leading-relaxed break-words">
                      {message.message}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{formatMessageTime(message.createdAt)}</span>
                    {isMyMessage && (
                      <CheckCheck className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full lg:w-8 lg:h-8 bg-gradient-to-br from-gray-400 to-gray-600">
              <span className="text-xs font-semibold text-white">
                {user?.userName?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="px-3 py-2 bg-gray-100 rounded-2xl rounded-bl-md lg:px-4 lg:py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white border-t border-gray-200 lg:p-4">
        <div className="flex items-end gap-2 lg:gap-3">
          <div className="flex-1 transition-colors duration-200 border border-gray-200 bg-gray-50 rounded-2xl focus-within:border-blue-500">
            <div className="flex items-end px-3 py-2 lg:px-4 lg:py-3">
              <button className="flex-shrink-0 p-1 mr-2 transition-colors duration-200 rounded-lg hover:bg-gray-200">
                <Paperclip className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5" />
              </button>

              <textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  adjustTextareaHeight(e.target);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 text-sm leading-5 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none resize-none lg:text-base"
                rows={1}
                style={{ minHeight: "20px", maxHeight: "120px" }}
              />

              <div className="flex items-center flex-shrink-0 gap-1 ml-2">
                <button className="p-1 transition-colors duration-200 rounded-lg hover:bg-gray-200">
                  <ImageIcon className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5" />
                </button>
                <button className="p-1 transition-colors duration-200 rounded-lg hover:bg-gray-200">
                  <Smile className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white transition-all duration-200 transform rounded-full lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetailPage;
