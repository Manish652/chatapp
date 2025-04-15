import { useThemeStore } from "../store/useThemeStore.jsx";
import { Send, Smile, Paperclip, MoreVertical, MessageSquare } from "lucide-react";
import { Input } from "../components/ui/input";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How's it going?",
    isSent: false,
    time: "10:30 AM",
    sender: {
      name: "Manish",
      avatar: "/avatar-1.png"
    }
  },
  {
    id: 2,
    content: "I'm doing great! Just checking out the new font sizes and theme options. What do you think?",
    isSent: true,
    time: "10:31 AM",
    sender: {
      name: "You",
      avatar: "/avatar-2.png"
    }
  },
  {
    id: 3,
    content: "They look amazing! The readability is much better now. 👍",
    isSent: false,
    time: "10:32 AM",
    sender: {
      name: "Manish",
      avatar: "/avatar-1.png"
    }
  }
];

const THEME_GROUPS = {
  "Light Themes": ["light", "cupcake", "bumblebee", "emerald", "corporate", "lofi", "pastel", "wireframe", "lemonade"],
  "Dark Themes": ["dark", "synthwave", "retro", "cyberpunk", "halloween", "forest", "black", "luxury", "dracula", "night", "coffee"],
  "Colorful": ["valentine", "garden", "aqua", "fantasy", "cmyk", "autumn", "business", "acid", "winter"]
};

const SettingsPage = () => {
  const { theme, setTheme, fontSize, setFontSize } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200/50 to-base-100 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h1 className="text-4xl mt-15 font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              echoLine
            </h1>
          </div>
          <p className="text-base-content/70 text-lg">
            Personalize your messaging experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr,1.5fr]">
          <div className="space-y-8">
            {/* Theme Section */}
            <div className="card bg-base-100 shadow-xl animate-fade-in hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                  </div>
                  <h2 className="card-title m-0">Appearance</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Theme</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(THEME_GROUPS).slice(0, 3).map(([groupName, themes]) => (
                        <button 
                          key={themes[0]}
                          className={`py-2 px-3 rounded-lg text-sm border transition-all ${
                            themes.includes(theme) 
                              ? 'border-primary bg-primary/10 text-primary font-medium' 
                              : 'border-base-300 hover:border-base-content/30'
                          }`}
                          onClick={() => setTheme(themes[0])}
                        >
                          {groupName}
                        </button>
                      ))}
                    </div>
                  
                    <div className="relative">
                      <select
                        className="select select-bordered w-full bg-base-100 pr-10"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      >
                        {Object.entries(THEME_GROUPS).map(([groupName, themes]) => (
                          <optgroup key={groupName} label={groupName}>
                            {themes.map(themeName => (
                              <option key={themeName} value={themeName}>
                                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Text Size</span>
                      <span className="label-text-alt">{fontSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="range range-primary range-sm"
                      step="1"
                    />
                    <div className="flex justify-between text-xs text-base-content/70 mt-1 px-1">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="card bg-base-100 shadow-xl animate-fade-in hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="card-title m-0">About echoLine</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-base-200/50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">echoLine</h3>
                      <p className="text-sm text-base-content/70">Version 1.0.0</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-base-200/50">
                    <h3 className="font-bold mb-2">Created by</h3>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img 
                            src="/avatar-2.png" 
                            alt="Creator"
                            onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=Manish`}
                          />
                        </div>
                      </div>
                      <p className="font-medium">Manish</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Preview Section */}
            <div className="card bg-base-100 shadow-xl animate-fade-in hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden">
              <div className="card-body p-0">
                <div className="p-4 border-b border-base-200 backdrop-blur-sm bg-base-100/90 sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="avatar online">
                        <div className="w-10 h-10 rounded-full ring-2 ring-primary/30">
                          <img 
                            src="/avatar-1.png" 
                            alt="Manish" 
                            onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Manish'} 
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ fontSize: `${Math.min(Math.max(parseInt(fontSize), 12), 24)}px` }}>Manish</h3>
                        <div className="flex items-center gap-1 text-xs text-base-content/70">
                          <span className="inline-block w-2 h-2 bg-success rounded-full"></span>
                          <span>Online</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm btn-circle">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-6 space-y-6 min-h-[400px] max-h-[400px] overflow-y-auto bg-base-200/30">
                  {PREVIEW_MESSAGES.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-end gap-2 ${message.isSent ? "justify-end" : "justify-start"} animate-fade-in`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {!message.isSent && (
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full ring-2 ring-primary/20">
                            <img 
                              src={message.sender.avatar} 
                              alt={message.sender.name}
                              onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${message.sender.name}`}
                            />
                          </div>
                        </div>
                      )}
                      <div className={`group max-w-[80%] space-y-1 ${message.isSent ? "items-end" : "items-start"}`}>
                        <div
                          className={`
                            rounded-2xl px-4 py-3 shadow-sm transition-all
                            ${message.isSent 
                              ? "bg-gradient-to-r from-primary to-primary text-primary-content rounded-br-none" 
                              : "bg-base-100 rounded-bl-none"
                            }
                          `}
                          style={{ fontSize: `${Math.min(Math.max(parseInt(fontSize), 12), 24)}px` }}
                        >
                          {message.content}
                        </div>
                        <span className={`text-xs text-base-content/50 px-2 ${message.isSent ? "text-right" : "text-left"}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex items-center gap-2">
                    <button className="btn btn-circle btn-ghost btn-sm bg-base-200/50">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        className="pr-10 rounded-full bg-base-200/50 focus:bg-base-200/80 transition-colors"
                        style={{ fontSize: `${Math.min(Math.max(parseInt(fontSize), 12), 24)}px` }}
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-sm">
                        <Smile className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="btn btn-primary btn-circle shadow-lg shadow-primary/20">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Note */}
            <div className="card bg-base-100 shadow-md border border-base-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-warning mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-base-content">Preview Mode</h3>
                  <p className="text-sm text-base-content/70">
                    This is a live preview of your current settings. Changes are applied immediately so you can see how they look.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;