import React from 'react';
import { X, Phone, Video, MoreVertical, Circle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChartStore } from '../store/useChartStore';

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChartStore();
  const { onlineUsers } = useAuthStore();
  
  const isOnline = onlineUsers.includes(selectedUser._id);
  
  return (
    <div className="px-4 py-3 border-b border-base-200 bg-base-100/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
      <div className="flex items-center justify-between">
        {/* User info section */}
        <div className="flex items-center gap-3 group">
          {/* Avatar with online indicator */}
          <div className="avatar relative">
            <div className="w-12 h-12 rounded-full ring-2 ring-base-200 transition-all duration-300 group-hover:ring-primary/20">
              <img 
                src={selectedUser.profilepic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="object-cover"
              />
            </div>
            {/* Online status indicator */}
            {isOnline && (
              <div className="absolute bottom-0 right-0">
                <div className="relative">
                  <Circle className="w-4 h-4 text-green-500 fill-green-500" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-75"></div>
                </div>
              </div>
            )}
          </div>
          
          {/* User details with typing animation */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-base-content">{selectedUser.fullName}</h3>
              {isOnline && (
                <div className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 rounded text-[10px] text-green-700 dark:text-green-400 font-medium">
                  Active now
                </div>
              )}
            </div>
            <p className="text-xs text-base-content/60 flex items-center gap-1.5">
              {isOnline ? (
                <>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span>Online</span>
                </>
              ) : (
                <>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-base-content/30"></span>
                  <span>Offline</span>
                </>
              )}
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Call button */}
          <button className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary hover:bg-primary/10 transition-colors">
            <Phone size={18} />
          </button>
          
          {/* Video call button */}
          <button className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary hover:bg-primary/10 transition-colors">
            <Video size={18} />
          </button>
          
          {/* Menu button */}
          <button className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-primary hover:bg-primary/10 transition-colors">
            <MoreVertical size={18} />
          </button>
          
          {/* Close conversation button with hover effect */}
          <button 
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;