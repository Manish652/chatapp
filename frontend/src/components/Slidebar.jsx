import { useEffect, useState } from "react";
import { useChartStore } from "../store/useChartStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Search, Plus, Filter, MessageSquare, UserRound } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Input } from "./ui/input";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChartStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnlineFilter = !showOnlineOnly || onlineUsers.includes(user._id);
    return matchesSearch && matchesOnlineFilter;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-200/30 bg-base-100/95 backdrop-blur-md flex flex-col transition-all duration-300 shadow-md">
      {/* Header */}
      <div className="p-4 border-b border-base-200/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold hidden lg:block text-lg text-base-content">Chats</span>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-base-200/50 border-none focus:bg-base-200/70 transition-all rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                showOnlineOnly
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "hover:bg-base-200/50 text-base-content/70"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden lg:inline">Online</span>
              <span className={`text-xs font-medium ${showOnlineOnly ? "text-primary" : "text-base-content/60"}`}>
                ({onlineUsers.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 shadow-md"
                  : "hover:bg-base-200/40"
              }`}
            >
              <div className="relative">
                <div className="avatar">
                  <div className="w-11 h-11 rounded-full ring-2 ring-offset-1 ring-offset-base-100 ring-primary/10">
                    <img
                      src={user.profilepic || "/avatar.png"}
                      alt={user.fullName}
                      onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${user.fullName}`}
                      className="object-cover"
                    />
                  </div>
                </div>
                {onlineUsers.includes(user._id) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-100 animate-pulse" />
                )}
              </div>
              <div className="flex-1 text-left hidden lg:block">
                <h3 className="font-medium truncate text-base-content">{user.fullName}</h3>
                <p className="text-xs text-base-content/70 truncate flex items-center gap-1">
                  {onlineUsers.includes(user._id) ? (
                    <>
                      <span className="inline-block w-2 h-2 bg-success rounded-full mr-1"></span>
                      <span className="font-medium text-success">Online</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 bg-base-content/30 rounded-full mr-1"></span>
                      <span>Offline</span>
                    </>
                  )}
                </p>
              </div>
              {/* Small screen indicator */}
              <div className="lg:hidden">
                {onlineUsers.includes(user._id) ? (
                  <span className="inline-block w-2 h-2 bg-success rounded-full" title="Online"></span>
                ) : (
                  <span className="inline-block w-2 h-2 bg-base-content/30 rounded-full" title="Offline"></span>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="h-60 flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center mb-5">
              <UserRound className="w-10 h-10 text-base-content/40" />
            </div>
            <h3 className="font-semibold text-lg text-base-content">No contacts found</h3>
            <p className="text-sm text-base-content/60 mt-2">
              {showOnlineOnly
                ? "No online contacts matching your search."
                : "Refine your search or try adding new contacts."}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-base-200/30 hidden lg:block">
        <div className="flex items-center justify-between text-xs text-base-content/60 font-medium">
          <span>Online: <span className="text-primary">{onlineUsers.length}</span></span>
          <span>Total: {users.length}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;