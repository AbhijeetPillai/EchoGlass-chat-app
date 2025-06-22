import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto backdrop-blur-md bg-gray-950/50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <ChatHeader />

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message, idx) => {
          const isSelf = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              ref={idx === messages.length - 1 ? messageEndRef : null}
              className={`chat ${isSelf ? "chat-end" : "chat-start"}`}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full ring-2 ring-indigo-500 shadow-md">
                  <img
                    src={
                      isSelf
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile"
                  />
                </div>
              </div>

              {/* Timestamp */}
              <div className="chat-header text-xs text-gray-400">
                <time className="ml-1 opacity-60">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Message bubble */}
              <div
                className={`chat-bubble shadow-md ${
                  isSelf
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-lg mb-2 border border-gray-700"
                  />
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
