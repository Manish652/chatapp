import express from 'express';
import { protectRoute } from '../middleware/auth.middileware.js';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// More specific routes first
router.get('/users', protectRoute, getUserForSidebar);
router.post('/send/:receiverId', protectRoute, sendMessage);
router.get('/chat/:chatId', protectRoute, getMessages);

export default router;