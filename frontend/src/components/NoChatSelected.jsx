import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-16 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-indigo-700 shadow-lg">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-700 flex items-center justify-center animate-pulse shadow-inner shadow-indigo-700/20">
            <MessageSquare className="w-9 h-9 text-indigo-400 drop-shadow-[0_0_4px_rgba(99,102,241,0.8)]" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-white">Welcome to Chatty</h2>
        <p className="text-sm text-indigo-300">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
