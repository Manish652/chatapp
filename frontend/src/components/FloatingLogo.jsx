import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function FloatingLogo() {
  return (
    <motion.div 
      className="w-32 h-32 relative cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageSquare className="w-16 h-16 text-white" />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-white/20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
} 