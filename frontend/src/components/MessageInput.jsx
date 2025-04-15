import { useRef, useState, useEffect } from "react";
import { Send, X, Smile, Paperclip } from "lucide-react";
import toast from "react-hot-toast";
import { useChartStore } from "../store/useChartStore";
import { Input } from "./ui/input";
import EmojiPicker from 'emoji-picker-react';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);
  const { sendMessage } = useChartStore();

  // Fixed emoji groups for quick selection
  const quickEmojis = [
    { emoji: "😊", name: "smile" },
    { emoji: "👍", name: "thumbs up" },
    { emoji: "❤️", name: "heart" },
    { emoji: "😂", name: "joy" },
    { emoji: "🎉", name: "party" },
    { emoji: "👋", name: "wave" },
    { emoji: "🔥", name: "fire" },
    { emoji: "✅", name: "check" }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Simple direct emoji insertion
  const insertEmoji = (emoji) => {
    setText(prev => prev + emoji);
    setShowEmojiPicker(false); // Close picker after selection
    
    // Focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Handle emoji selection from the EmojiPicker component
  const onEmojiClick = (emojiData) => {
    insertEmoji(emojiData.emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      const messageData = {
        text: text.trim(),
        image: imagePreview,
      };

      await sendMessage(messageData);

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showEmojiPicker &&
        emojiButtonRef.current && 
        !emojiButtonRef.current.contains(event.target) &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="border-t border-base-300 p-4">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mb-4 max-w-[200px]">
          <img
            src={imagePreview}
            alt="Preview"
            className="rounded-lg w-full h-auto border border-base-300"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 p-1 bg-error text-error-content rounded-full hover:bg-error/90 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Quick Emoji Bar */}
      <div className="flex mb-3 gap-2">
        {quickEmojis.map((item, index) => (
          <button
            key={index}
            onClick={() => insertEmoji(item.emoji)}
            className="text-xl p-2 rounded-full hover:bg-base-200 transition-colors"
            title={item.name}
          >
            {item.emoji}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="pr-12"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              ref={emojiButtonRef}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-1.5 rounded-lg hover:bg-base-200 transition-colors"
            >
              <Smile className={`size-5 ${showEmojiPicker ? "text-primary" : "text-base-content/70"}`} />
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-base-200 transition-colors"
        >
          <Paperclip className="size-5 text-base-content/70" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`p-2 rounded-lg ${
            text.trim() || imagePreview
              ? "bg-primary text-primary-content hover:bg-primary/90"
              : "bg-base-200 text-base-content/50"
          } transition-colors`}
        >
          <Send className="size-5" />
        </button>
      </form>

      {/* Simplified Emoji Picker */}
      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef} 
          className="absolute bottom-20 right-4 z-50 bg-base-100 rounded-lg shadow-xl border border-base-300"
          style={{ maxWidth: "320px" }}
        >
          <div className="p-2 flex justify-between items-center border-b border-base-300">
            <span className="font-medium">Emojis</span>
            <button 
              onClick={() => setShowEmojiPicker(false)}
              className="p-1 rounded-md hover:bg-base-200"
            >
              <X className="size-4" />
            </button>
          </div>
          
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={320}
            height={350}
            searchPlaceholder="Search emoji..."
            previewConfig={{
              showPreview: false
            }}
            skinTonesDisabled={false}
          />
        </div>
      )}
    </div>
  );
};

export default MessageInput;