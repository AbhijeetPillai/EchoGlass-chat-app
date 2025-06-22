import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-indigo-700 bg-gray-900/60 backdrop-blur-lg flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-indigo-700 w-full p-5">
        <div className="flex items-center gap-2 text-indigo-400">
          <Users className="size-5" />
          <span className="font-semibold text-sm hidden lg:block">Contacts</span>
        </div>

        {/* Online toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2 text-indigo-300">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm border-indigo-400"
            />
            <span className="text-xs">Show online only</span>
          </label>
          <span className="text-xs text-indigo-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 transition-all duration-150 
              ${
                selectedUser?._id === user._id
                  ? "bg-indigo-800/20 ring-1 ring-indigo-700"
                  : "hover:bg-indigo-700/10"
              }`}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border border-indigo-600 shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full ring-2 ring-gray-900" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-indigo-100 truncate">{user.fullName}</div>
              <div className="text-xs text-indigo-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-indigo-400 py-6">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
