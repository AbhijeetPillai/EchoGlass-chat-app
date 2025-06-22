import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 pt-20 px-4 text-white">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-6xl h-[calc(100vh-8rem)] rounded-2xl bg-gray-950/70 backdrop-blur-xl border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] overflow-hidden relative">
          <div className="flex h-full">

            {/* Sidebar (collapsible) */}
            <div
              className={`
                transition-all duration-300 ease-in-out 
                ${isSidebarOpen ? "w-64" : "w-0"}
                overflow-hidden
              `}
            >
              <Sidebar />
            </div>

            {/* Collapse/Expand Button */}
            <button
              className="absolute top-4 left-[260px] z-50 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full shadow-md transition-all duration-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Chat Area */}
            <div className="flex-1">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
