import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-50 bg-black/70 backdrop-blur-md border-b border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl bg-indigo-600/20 group-hover:bg-indigo-600/30 transition-all flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.4)]">
              <MessageSquare className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <h1 className="text-xl font-bold text-indigo-300 tracking-wide group-hover:text-indigo-400 transition-all">
              Quantum Chat
            </h1>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="btn btn-sm bg-transparent border border-indigo-600 text-indigo-300 hover:bg-indigo-600/20 transition duration-300"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm bg-transparent border border-indigo-600 text-indigo-300 hover:bg-indigo-600/20 transition duration-300"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm bg-transparent border border-red-500 text-red-400 hover:bg-red-500/20 transition duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
