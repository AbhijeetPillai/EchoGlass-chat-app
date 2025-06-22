import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [showSaved, setShowSaved] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    };
  };

  const handleSaveChanges = async () => {
    const updateData = {
      fullName: fullName.trim(),
      profilePic: selectedImg || authUser.profilePic,
    };

    await updateProfile(updateData);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-gray-950/70 backdrop-blur-xl border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)] rounded-2xl p-8 space-y-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-400">Profile</h1>
            <p className="text-sm text-gray-400 mt-1">Update your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600/60 hover:bg-indigo-700 cursor-pointer transition-all
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProfile ? "Uploading..." : "Click to change your photo"}
            </p>
          </div>

          {/* Full Name */}
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-sm mb-1">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800 border border-indigo-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-sm mb-1">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="bg-gray-800 border border-indigo-700 px-4 py-2.5 rounded-lg text-white">
              {authUser?.email}
            </p>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleSaveChanges}
              disabled={isUpdatingProfile}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUpdatingProfile ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>

            {showSaved && (
              <span className="flex items-center gap-1 text-green-400 text-sm animate-pulse">
                <CheckCircle className="w-4 h-4" /> Saved!
              </span>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-gray-900/50 border border-indigo-600 rounded-xl p-6 mt-6">
            <h2 className="text-lg font-semibold text-indigo-400 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between border-b border-indigo-700 pb-2">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span>Account Status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
