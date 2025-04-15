import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut, Bell, Search, Menu, Info, Mail, Star, Bot, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useThemeStore } from "../store/useThemeStore.jsx";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on login, signup, or settings page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isSettingsPage = location.pathname === '/settings';
  const isFeaturesPage = location.pathname === '/features';
  const isAboutPage = location.pathname === '/about';
  const isContactPage = location.pathname === '/contact';
  const isAIChatPage = location.pathname === '/ai-chat';
  
  // Check if we're on any page that should hide protected icons
  const shouldHideProtectedIcons = isAuthPage || isSettingsPage || isFeaturesPage || isAboutPage || isContactPage || isAIChatPage;

  return (
    <header className="bg-base-100/80 border-b border-base-300 shadow-sm fixed w-full top-0 z-40 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Search */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h1 className="text-base sm:text-lg font-bold">echoLine</h1>
            </Link>

            {/* Search Bar - Hidden on mobile and pages that hide protected icons */}
            {!shouldHideProtectedIcons && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
                <Search className="w-4 h-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="bg-transparent border-none outline-none text-sm w-40"
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Hidden on pages that hide protected icons */}
          {!shouldHideProtectedIcons && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Common Navigation - Always visible */}
            <Link
              to="/features"
              className="p-2 rounded-lg hover:bg-base-200 transition-colors"
              title="Features"
            >
              <Sparkles className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="p-2 rounded-lg hover:bg-base-200 transition-colors"
              title="About"
            >
              <Info className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="p-2 rounded-lg hover:bg-base-200 transition-colors"
              title="Contact"
            >
              <Mail className="w-5 h-5" />
            </Link>

            {/* Settings - Always visible */}
            <Link
              to="/settings"
              className="p-2 rounded-lg hover:bg-base-200 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            {/* Other actions - Only visible when not on pages that hide protected icons */}
            {!shouldHideProtectedIcons && (
              <>
                <Link
                  to="/ai-chat"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="AI Chat"
                >
                  <Bot className="w-5 h-5" />
                </Link>
                <button className="p-2 rounded-lg hover:bg-base-200 transition-colors" title="Notifications">
                  <Bell className="w-5 h-5" />
                </button>
                <Link
                  to="/profilepage"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Hidden on pages that hide protected icons */}
        {!shouldHideProtectedIcons && isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200/50">
                <Search className="w-4 h-4 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="bg-transparent border-none outline-none text-sm flex-1"
                />
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between">
                <Link
                  to="/features"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Features"
                >
                  <Sparkles className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="About"
                >
                  <Info className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Contact"
                >
                  <Mail className="w-5 h-5" />
                </Link>
                <Link
                  to="/settings"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <button className="p-2 rounded-lg hover:bg-base-200 transition-colors" title="Notifications">
                  <Bell className="w-5 h-5" />
                </button>
                <Link
                  to="/profilepage"
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-base-200 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
