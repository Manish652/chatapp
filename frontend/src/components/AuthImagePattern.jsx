import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Lock, Mail, Shield, Key, Eye, Zap, Bell } from 'lucide-react';

const AuthImagePattern = ({ 
  title = "Welcome", 
  subtitle = "Sign in to continue to your account" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingIcons, setFloatingIcons] = useState([]);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Generate floating icon elements
  useEffect(() => {
    const icons = [Lock, Mail, Shield, Key, Eye, Zap, Bell];
    const newFloatingIcons = Array(12).fill().map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 14 + Math.random() * 10,
      opacity: 0.07 + Math.random() * 0.05,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20
    }));
    setFloatingIcons(newFloatingIcons);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 overflow-hidden">
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          backgroundImage: "url('w2.png')"
        }}
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100
        }}
      />

      {/* Floating authentication icons in background */}
      {floatingIcons.map(icon => {
        const IconComponent = icon.Icon;
        return (
          <motion.div
            key={icon.id}
            className="absolute text-white pointer-events-none"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              opacity: icon.opacity
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: icon.delay
            }}
          >
            <IconComponent size={icon.size} />
          </motion.div>
        );
      })}

      {/* Animated gradients */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.15) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.15) 0%, transparent 40%)',
            'radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.15) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 80%, rgba(79, 70, 229, 0.15) 0%, transparent 40%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -10, 0],
          y: [0, 10, 0],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-2/3 left-1/3 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle particle effect */}
      <div className="absolute inset-0">
        {Array(20).fill().map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Orbiting elements around content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              transformOrigin: "center center",
              left: "calc(50% - 20px)",
              top: "calc(50% - 20px)",
              transform: `rotate(${i * 60}deg) translateX(${180 + i * 20}px)`
            }}
          >
            {i % 2 === 0 ? 
              <Lock className="w-4 h-4 text-white/80" /> : 
              <Shield className="w-4 h-4 text-white/80" />
            }
          </motion.div>
        ))}
      </div>

      {/* Interactive content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div
          className="backdrop-blur-xl bg-black/30 p-12 rounded-2xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(79, 70, 229, 0.2)",
          }}
          whileHover={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 35px -5px rgba(79, 70, 229, 0.4)",
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
        >
          {/* Animated corner decorations */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-blue-400/50 rounded-br-lg" />
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-purple-400/30 rounded-tr-lg" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-purple-400/30 rounded-bl-lg" />
          
          {/* Animated icon container */}
          <div className="relative mb-8">
            {/* Rotating ring around icon */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full border-2 border-dashed border-blue-400/30"
              style={{ left: "calc(50% - 48px)", top: "calc(50% - 48px)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          
            <motion.div 
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background in icon */}
              <motion.div
                className="absolute inset-0 opacity-50"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0.3) 50%, rgba(56, 189, 248, 0) 100%)',
                    'linear-gradient(45deg, rgba(56, 189, 248, 0) 50%, rgba(56, 189, 248, 0.3) 100%, rgba(56, 189, 248, 0) 150%)',
                    'linear-gradient(45deg, rgba(56, 189, 248, 0) 100%, rgba(56, 189, 248, 0.3) 150%, rgba(56, 189, 248, 0) 200%)',
                  ]
                }}
                transition={{
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <Lock className="w-10 h-10 text-white relative z-10" />
            </motion.div>
            
            {/* Small orbiting elements */}
            <motion.div
              className="absolute w-8 h-8 rounded-full bg-blue-500/20 backdrop-blur-md p-1.5"
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: "calc(50% - 16px)",
                top: "-4px",
                transformOrigin: "center 60px"
              }}
            >
              <Key className="w-full h-full text-white" />
            </motion.div>
            
            <motion.div
              className="absolute w-8 h-8 rounded-full bg-purple-500/20 backdrop-blur-md p-1.5"
              animate={{
                rotate: [180, 540]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: "calc(50% - 16px)",
                top: "80px",
                transformOrigin: "center -40px"
              }}
            >
              <Shield className="w-full h-full text-white" />
            </motion.div>
          </div>
          
          <motion.h2
            className="text-4xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>
          
          <motion.p
            className="text-white/80 text-lg max-w-md mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          />
          
          {/* Pulsing dots */}
          <div className="flex justify-center gap-3 mt-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full shadow-sm ${
                  i === 0 ? 'bg-blue-400' : i === 1 ? 'bg-indigo-400' : 'bg-purple-400'
                }`}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subtle light flare following mouse */}
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 90
        }}
      />
      
      {/* Custom keyframe animations */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;