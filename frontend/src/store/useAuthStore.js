import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.MODE === "development" ? "http://localhost:3000" : "/";

// Create a separate store for socket that won't be persisted
export const useSocketStore = create((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}));

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data });
          get().connectSocket();
        } catch (error) {
          set({ authUser: null });
          if (error?.response?.status !== 401 && error?.message !== 'Network Error') {
            console.error("CheckAuth failed:", error?.response?.data);
          }
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          get().connectSocket();
        } catch (error) {
          toast.error("Error creating account");
        } finally {
          set({ isSigningUp: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error?.response?.data?.message || "Logout failed");
        }
      },

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
          get().connectSocket();
        } catch (error) {
          toast.error(error?.response?.data?.message || "Login failed");
        } finally {
          set({ isLoggingIn: false });
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.error("Error in update profile:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
          toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        const socket = useSocketStore.getState().socket;
        
        // Don't connect if no user or already connected
        if (!authUser || socket?.connected) return;
        
        // Create new socket connection
        const newSocket = io(BASE_URL, {
          path: "/socket.io",
          autoConnect: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          withCredentials: true
        });

        // Socket event handlers
        newSocket.on("connect", () => {
          console.log("Socket connected with ID:", newSocket.id);
          // Send setup event with user ID
          newSocket.emit("setup", authUser._id);
        });

        newSocket.on("disconnect", () => {
          console.log("Socket disconnected");
          set({ onlineUsers: [] });
        });

        newSocket.on("error", (error) => {
          console.error("Socket error:", error);
        });

        newSocket.on("getOnlineUsers", (userIds) => {
          console.log("Online users updated:", userIds);
          set({ onlineUsers: userIds.filter(id => id !== authUser._id) });
        });

        // Store the socket instance
        useSocketStore.getState().setSocket(newSocket);
      },

      disconnectSocket: () => {
        const socket = useSocketStore.getState().socket;
        if (socket?.connected) {
          // Emit user offline event before disconnecting
          socket.emit("userOffline", get().authUser?._id);
          socket.disconnect();
          useSocketStore.getState().setSocket(null);
          set({ onlineUsers: [] }); // Clear online users list
        } else {
          console.log("Socket is not connected");
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        authUser: state.authUser,
        onlineUsers: state.onlineUsers
      })
    }
  )
);
