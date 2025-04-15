import React, { useEffect, useState } from 'react';
import { MessageSquare, Users, ArrowRight, Send, Zap, Bell, Settings, Moon, Search, Star } from "lucide-react";

const NoChartSelected = () => {
  const [floatingIcons, setFloatingIcons] = useState([]);
  
  // Generate random floating message bubbles in the background
  useEffect(() => {
    const icons = Array(8).fill().map((_, i) => ({
      id: i,
      icon: [MessageSquare, Send, Users, Star][Math.floor(Math.random() * 4)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 24,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      opacity: 0.03 + Math.random() * 0.08
    }));
    setFloatingIcons(icons);
  }, []);

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Floating background icons */}
      {floatingIcons.map(icon => {
        const IconComponent = icon.icon;
        return (
          <div 
            key={icon.id} 
            className="absolute opacity-5 text-primary"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              animationDelay: `${icon.delay}s`,
              opacity: icon.opacity
            }}
          >
            <IconComponent className="w-full h-full" />
          </div>
        );
      })}
      
      {/* Gradient background circles */}
      <div className="absolute left-1/4 -top-20 w-96 h-96 rounded-full bg-gradient-to-r from-primary/10 to-secondary/5 blur-3xl"></div>
      <div className="absolute right-1/4 -bottom-20 w-96 h-96 rounded-full bg-gradient-to-r from-secondary/10 to-primary/5 blur-3xl"></div>
      
      <div className="max-w-md text-center space-y-12 relative z-10">
        {/* Advanced Animated Icon Display */}
        <div className="relative flex justify-center mb-6 py-6">
          {/* Orbiting elements */}
          <div className="absolute w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-8 h-8 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center"
                style={{
                  animation: `orbit ${10 + i}s linear infinite`,
                  transformOrigin: 'center center',
                  left: 'calc(50% - 16px)',
                  top: 'calc(50% - 16px)',
                }}
              >
                {[<Send size={14} />, <Bell size={14} />, <Zap size={14} />, <Moon size={14} />, <Settings size={14} />, <Search size={14} />][i]}
              </div>
            ))}
          </div>

          {/* Main icon display with pulsing effects */}
          <div className="relative">
            {/* Background elements */}
            <div className="absolute -left-8 top-8 w-16 h-16 rounded-xl bg-primary/5 animate-pulse" />
            <div className="absolute -right-8 bottom-8 w-16 h-16 rounded-xl bg-secondary/5 animate-pulse delay-700" />
            
            {/* Main icon container */}
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-xl border border-primary/10 relative">
              {/* Animated gradient overlay */}
              <div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 opacity-80 animate-pulse" />
              
              {/* Rotating border effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 border-dashed animate-spin-slow" style={{ animationDuration: '15s' }} />
              
              {/* Center icon */}
              <div className="relative z-10 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-inner">
                <MessageSquare className="w-14 h-14 text-primary" />
              </div>
            </div>
            
            {/* Orbiting message icons */}
            <div className="absolute -right-6 -bottom-6 w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border border-primary/10 animate-bounce-slow">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute -left-6 -top-6 w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border border-secondary/10 animate-bounce-slow delay-500">
              <Users className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </div>
        
        {/* Welcome Text with enhanced styling */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold relative">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to echoLine!
            </span>
            <div className="absolute -right-8 -top-8 text-primary/10 transform rotate-12">
              <Star className="w-8 h-8" />
            </div>
            <div className="absolute -left-6 -bottom-4 text-secondary/10 transform -rotate-12">
              <Zap className="w-6 h-6" />
            </div>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select a conversation from the sidebar to start chatting
          </p>
          
          <div className="inline-flex items-center justify-center px-4 py-1 bg-primary/5 rounded-full text-primary text-sm">
            <Zap className="w-3 h-3 mr-1" />
            <span>Your messages are end-to-end encrypted</span>
          </div>
        </div>
        
        {/* Enhanced Instructions */}
        <div className="mt-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent h-px" />
          
          <div className="pt-10 pb-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span>Select Contact</span>
              </div>
              
              <ArrowRight className="w-5 h-5 hidden md:block text-primary/30 mx-1" />
              <div className="w-px h-8 bg-primary/10 md:hidden my-1" />
              
              <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-secondary" />
                </div>
                <span>Start Chatting</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Decorative dots */}
        <div className="flex justify-center gap-3 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full shadow-sm
                ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-600'}
                animate-pulse`}
              style={{ animationDelay: `${i * 300}ms` }}
            />
          ))}
        </div>
      </div>
      
      {/* Add keyframe animation for orbiting elements */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NoChartSelected;

