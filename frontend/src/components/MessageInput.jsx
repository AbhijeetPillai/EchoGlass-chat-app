import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, FileAudio2 } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = () => {
    setFile(null);
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !file) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        file,
      });

      setText("");
      setImagePreview(null);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (audioInputRef.current) audioInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-gray-950/60 backdrop-blur-md rounded-b-xl border-t border-indigo-800">
      {(imagePreview || file) && (
        <div className="mb-3 flex items-center gap-4 flex-wrap">
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-indigo-600 shadow-md"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-800 text-white flex items-center justify-center hover:bg-red-600 transition"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          )}
          {file && (
            <div className="bg-zinc-800 px-3 py-2 rounded-md border border-indigo-700 flex items-center gap-2 text-sm text-white shadow">
              <FileAudio2 size={18} className="text-indigo-400" />
              <div>
                <p className="truncate max-w-[120px]">{file.name}</p>
                <p className="text-xs text-zinc-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button onClick={removeFile} className="ml-1 text-red-500 hover:text-red-400">
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-gray-900 border border-indigo-700 rounded-xl px-4 py-2">
          <input
            type="text"
            placeholder="Type a futuristic message..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-indigo-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`transition ${
              imagePreview ? "text-emerald-500" : "text-indigo-400"
            } hover:text-indigo-300`}
          >
            <Image size={20} />
          </button>

          {/* Audio/File Upload */}
          <input
            type="file"
            accept="audio/*,application/pdf"
            className="hidden"
            ref={audioInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => audioInputRef.current?.click()}
            className={`transition ${
              file ? "text-emerald-500" : "text-indigo-400"
            } hover:text-indigo-300`}
          >
            <FileAudio2 size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition shadow-md disabled:opacity-40"
          disabled={!text.trim() && !imagePreview && !file}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
