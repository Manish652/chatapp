import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useAuthStore, useSocketStore } from "./useAuthStore";

export const useChartStore = create(
  persist(
    (set, get) => ({
      messages: [],
      users: [],
      selectedUser: null,
      isUsersLoading: false,
      isMessagesLoading: false,

      getUsers: async () => {
        set({ isUsersLoading: true, selectedUser: null });
        try {
          const res = await axiosInstance.get("/messages/users");
          set({ users: res.data });
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
          set({ isUsersLoading: false });
        }
      },

      getMessages: async (userId) => {
        if (!userId) return;
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`/messages/chat/${userId}`);
          set({ messages: res.data });
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch messages");
          set({ messages: [] });
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      setSelectedUser: (selectedUser) => {
        set({ selectedUser });
        if (selectedUser?._id) {
          get().getMessages(selectedUser._id);
        } else {
          set({ messages: [] });
        }
      },

      sendMessage: async (messageData) => {
        const { selectedUser } = get();
        if (!selectedUser?._id) return;
        
        try {
          const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
          // Update messages immediately for sender
          set((state) => ({
            messages: [...state.messages, res.data]
          }));
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to send message");
        }
      },

      addNewMessage: (message) => {
        const { selectedUser } = get();
        const authUser = useAuthStore.getState().authUser;

        // Only handle received messages through socket
        // Sent messages are handled in sendMessage function
        if (message.senderId._id === authUser._id) return;

        // Check if this message is for the current chat
        const isCurrentChat = selectedUser?._id === message.senderId._id;

        if (isCurrentChat) {
          // Check if message already exists to prevent duplicates
          set((state) => {
            const messageExists = state.messages.some(m => m._id === message._id);
            if (messageExists) return state;
            return {
              messages: [...state.messages, message]
            };
          });
        }
      },

      subscribeToMessages: () => {
        const socket = useSocketStore.getState().socket;
        if (!socket) return;

        // Remove any existing listeners first
        socket.off("newMessage");
        
        // Add new listener
        socket.on("newMessage", (message) => {
          console.log("New message received:", message);
          get().addNewMessage(message);
        });
      },

      unsubscribeToMessages: () => {
        const socket = useSocketStore.getState().socket;
        if (!socket) return;
        socket.off("newMessage");
      }
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        selectedUser: state.selectedUser,
      }),
    }
  )
);