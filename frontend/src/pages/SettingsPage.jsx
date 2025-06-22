import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Theme Selection */}
        <div className="bg-gray-950/70 backdrop-blur-lg border border-indigo-500 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-400 mb-1">Theme</h2>
          <p className="text-sm text-gray-400 mb-6">
            Choose a theme for your chat interface
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-2 p-2 rounded-xl border 
                  transition-all ${theme === t
                    ? "bg-indigo-600/20 border-indigo-400"
                    : "hover:bg-indigo-500/10 border-gray-700"
                  }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative w-full h-8 rounded-lg overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-gray-300 truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-950/70 backdrop-blur-xl border border-indigo-500 rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4">Preview</h3>

          <div className="bg-gray-900/80 rounded-xl shadow-lg p-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-indigo-600 pb-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                J
              </div>
              <div>
                <h4 className="text-sm font-medium">Abhijeet</h4>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto px-1">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-xl shadow 
                      ${message.isSent
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-800 text-gray-200"
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-[10px] mt-1 text-gray-400">12:00 PM</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Preview */}
            <div className="mt-4 flex gap-2 border-t border-indigo-600 pt-3">
              <input
                type="text"
                className="flex-1 text-sm bg-gray-800 border border-indigo-500 rounded-md px-3 py-2 text-white placeholder-gray-400"
                value="This is a preview"
                readOnly
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center justify-center">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
