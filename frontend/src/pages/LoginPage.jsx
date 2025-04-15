import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { 
  Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, 
  Github, Twitter, ArrowRight, CheckCircle2, Sparkles, Zap, Send,
  Star, Clock, Shield, Bell, Award, Heart, User, Settings, Code
} from "lucide-react";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formFocus, setFormFocus] = useState({
    email: false,
    password: false
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  // Animated background elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Icon rotation animation - Slowed down
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.5) % 360);
    }, 100);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(rotationInterval);
    };
  }, []);

  // Floating icons configuration with slower animations
  const floatingIcons = [
    { icon: Star, color: "text-yellow-500", size: 20, delay: 0 },
    { icon: Shield, color: "text-green-500", size: 24, delay: 1.5 },
    { icon: Bell, color: "text-purple-500", size: 18, delay: 0.7 },
    { icon: Award, color: "text-amber-500", size: 22, delay: 2.2 },
    { icon: Heart, color: "text-red-400", size: 20, delay: 1.2 },
    { icon: User, color: "text-blue-400", size: 18, delay: 0.4 },
    { icon: Settings, color: "text-slate-400", size: 16, delay: 1.8 },
    { icon: Code, color: "text-cyan-400", size: 22, delay: 2.6 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }
    
    login(formData).catch(err => {
      toast.error(err.message || "Login failed. Please try again.");
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100">
      {/* Left Side - Form */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5" />
        
        <motion.div 
          className="absolute h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div 
          className="absolute h-64 w-64 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Floating mini icons in background - Left side */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute w-8 h-8 rounded-full bg-base-300/10 flex items-center justify-center ${item.color}/20`}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 20 + index,
              repeat: Infinity,
              delay: item.delay * 2,
            }}
          >
            <item.icon size={item.size} className={item.color} />
          </motion.div>
        ))}

        {/* Sparkles on left side */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-full h-full text-yellow-500/30" />
          
          {/* Radiating circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-yellow-500/30"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{
                scale: [0.8, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2.4,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 h-16"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-full h-full text-blue-500/30" />
          
          {/* Radiating circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-blue-500/30"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{
                scale: [0.8, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2.4,
              }}
            />
          ))}
        </motion.div>
        
        <div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          style={{
            transform: `translateX(${(mousePosition.x - window.innerWidth / 2) / 50}px) translateY(${(mousePosition.y - window.innerHeight / 2) / 50}px)`,
          }}
        />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md space-y-6 sm:space-y-8 relative z-10"
        >
          {/* Logo */}
          <div className="text-center">
            <motion.div 
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 relative overflow-hidden"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </motion.div>
              
              <div className="space-y-1">
                <motion.h1 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome Back
                </motion.h1>
                <motion.p 
                  className="text-sm sm:text-base text-base-content/70"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Sign in to your account
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Email */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.email ? 'ring-2 ring-offset-2 ring-primary/20 rounded-lg' : ''}`}>
                <motion.div 
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300"
                  animate={formFocus.email ? { 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1] 
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className={`transition-colors duration-300 ${formFocus.email ? 'text-primary' : 'text-base-content/50'}`} size={18} />
                </motion.div>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFormFocus({...formFocus, email: true})}
                  onBlur={() => setFormFocus({...formFocus, email: false})}
                  className="pl-10 transition-all border-base-300 focus:border-primary h-10 sm:h-12"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <div className={`relative transition-all duration-300 ${formFocus.password ? 'ring-2 ring-offset-2 ring-primary/20 rounded-lg' : ''}`}>
                <motion.div 
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300"
                  animate={formFocus.password ? { 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1] 
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Lock className={`transition-colors duration-300 ${formFocus.password ? 'text-primary' : 'text-base-content/50'}`} size={18} />
                </motion.div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFormFocus({...formFocus, password: true})}
                  onBlur={() => setFormFocus({...formFocus, password: false})}
                  className="pl-10 pr-10 transition-all border-base-300 focus:border-primary h-10 sm:h-12"
                />
                <motion.button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div 
              className="flex items-center justify-between text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-sm checkbox-primary" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  {rememberMe && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <CheckCircle2 className="text-primary w-3 h-3" />
                    </motion.div>
                  )}
                </div>
                <span className="text-base-content/70 group-hover:text-base-content transition-colors">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-primary hover:underline flex items-center gap-1 hover:gap-2 transition-all"
              >
                <span>Forgot password?</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-primary-content rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
              disabled={isLoggingIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 15,
                delay: 0.9 
              }}
            >
              {isLoggingIn ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-100 text-base-content/50">Or continue with</span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div 
              className="grid grid-cols-2 gap-3"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                type="button"
                className="flex items-center justify-center gap-2 h-10 sm:h-12 rounded-lg border border-base-300 hover:bg-base-200 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center gap-2 h-10 sm:h-12 rounded-lg border border-base-300 hover:bg-base-200 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-sm font-medium">Twitter</span>
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-base-content/70 text-sm">
              Don&apos;t have an account?{" "}
              <Link 
                to="/signup" 
                className="text-primary hover:underline font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                <span>Create account</span>
                <ArrowRight size={14} />
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="hidden lg:block relative overflow-hidden flex-1 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        {/* Enhanced Animated Background */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
              'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
            ],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Rotating 3D Logo in background - Slowed down */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-10"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 10, 0, -10, 0],
          }}
          transition={{
            rotateY: {
              duration: 80,
              repeat: Infinity,
              ease: "linear",
            },
            rotateX: {
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <MessageSquare className="w-32 h-32 text-white" />
          </div>
        </motion.div>

        {/* Grid of randomly positioned, animated app icons - Slowed down */}
        {[...Array(12)].map((_, i) => {
          const icons = [MessageSquare, Send, Star, Heart, Bell, User, Shield, Settings];
          const RandomIcon = icons[i % icons.length];
          const size = Math.floor(Math.random() * 16) + 16;      
          const posX = Math.floor(Math.random() * 80) + 10;
          const posY = Math.floor(Math.random() * 80) + 10;
          const delay = Math.random() * 60;
          const duration = Math.random() * 40 + 40;
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <RandomIcon className="text-white/30" size={size} />
            </motion.div>
          );
        })}

        {/* Enhanced Floating Message Bubbles - Slowed down */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <MessageSquare className="w-8 h-8 text-blue-500/50" />
          </motion.div>
          
          {/* Orbiting mini icons - Slowed down */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4"
              style={{
                left: '50%',
                top: '50%',
                x: `calc(${Math.cos((angle + rotationAngle * 0.5) * (Math.PI / 180)) * 50}px - 50%)`,
                y: `calc(${Math.sin((angle + rotationAngle * 0.5) * (Math.PI / 180)) * 50}px - 50%)`,
              }}
            >
              <MessageSquare className="w-4 h-4 text-blue-500/30" />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Animated Sparkles - Slowed down */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-full h-full text-yellow-500/30" />
          
          {/* Radiating circles - Slowed down */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-yellow-500/30"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{
                scale: [0.8, 2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2.4,
              }}
            />
          ))}
        </motion.div>

        <AuthImagePattern />
      </motion.div>
    </div>
  );
};

export default LoginPage;