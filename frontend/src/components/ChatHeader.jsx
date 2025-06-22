import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-4 border-b border-indigo-500/30 bg-black/40 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar relative">
            <div className="size-10 rounded-full ring-2 ring-indigo-500 overflow-hidden shadow-md">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
            </div>
            {/* Online Indicator */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${
                isOnline ? "bg-green-500" : "bg-zinc-500"
              }`}
            />
          </div>

          {/* User Info */}
          <div className="text-sm">
            <h3 className="text-indigo-200 font-semibold">{selectedUser.fullName}</h3>
            <p
              className={`text-xs ${
                isOnline ? "text-green-400" : "text-zinc-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-zinc-400 hover:text-red-400 transition"
          title="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
