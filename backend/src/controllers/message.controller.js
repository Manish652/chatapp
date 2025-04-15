import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';

export const getUserForSidebar = async (req, res) => {  
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filterUsers);
    } catch (error) {
        console.log("error in getUserForSidebar controller", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try{
        const {chatId:userToChartId} = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: senderId, receiverId:userToChartId},
                {senderId: userToChartId, receiverId: senderId}
            ]
        }).populate('senderId', 'profilepic fullName')
          .populate('receiverId', 'profilepic fullName');

        res.status(200).json(messages);

    }catch(error){
        console.log("error in getMessages controller", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImage.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // Populate the message before sending
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('senderId', 'profilepic fullName')
            .populate('receiverId', 'profilepic fullName');

        // Get receiver's socket ID
        const receiverSocketId = getReceiverSocketId(receiverId);

        // Emit to receiver if they're online
        if (receiverSocketId) {
            // Send to specific socket
            io.to(receiverSocketId).emit("newMessage", populatedMessage);
        }

        // Send response to sender
        res.status(201).json(populatedMessage);
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
}
