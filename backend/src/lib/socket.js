import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true
  },
});

// Store user socket mappings
const userSocketMap = new Map();

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId);
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Handle user connection
  socket.on("setup", (userId) => {
    // Store user's socket mapping
    userSocketMap.set(userId, socket.id);
    socket.userId = userId; // Store userId in socket for later use
    
    // Broadcast online users
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    console.log("User connected:", userId, "Socket:", socket.id);
    console.log("Online users:", Array.from(userSocketMap.keys()));
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (socket.userId) {
      userSocketMap.delete(socket.userId);
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

export { io, app, server };
