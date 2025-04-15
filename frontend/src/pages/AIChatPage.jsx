import { Bot, MessageSquare, Sparkles, Zap, Brain, Shield, Lock } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Navigate } from 'react-router-dom';

const AIChatPage = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Intelligent Conversations",
      description: "Our AI is currently taking a coffee break ☕️, but will be back soon with amazing chat skills!"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "The AI is currently learning how to stay awake 24/7... It's a work in progress! 😴"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe Space",
      description: "Our AI is practicing its listening skills and learning to be the best virtual friend! 🤗"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Responses",
      description: "The AI is in training to be faster than your morning coffee! ⚡️"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Bot className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI Chat Companion</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-primary" />
            <p className="text-base-content/70">Exclusive for echoLine users</p>
          </div>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
            No friends? No problem! Our AI companion is coming soon to keep you company! 🎉
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-base-200 hover:bg-base-300 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="max-w-2xl mx-auto bg-base-200 rounded-2xl p-6 mb-16 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Coming Soon! 🚀</h2>
          <p className="text-base-content/70 mb-4">
            Our AI companion is currently in development, learning how to be the perfect chat buddy!
          </p>
          <div className="space-y-2 text-sm text-base-content/50">
            <p>🤖 Learning how to tell better jokes...</p>
            <p>💭 Practicing deep conversations...</p>
            <p>🎮 Mastering the art of virtual friendship...</p>
            <p>☕️ Taking coffee breaks (just like humans do!)</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Tuned! 🎯</h2>
          <p className="text-base-content/70 mb-6 max-w-xl mx-auto">
            We're working hard to bring you an amazing AI companion. Check back soon for updates!
          </p>
          <button className="btn btn-primary gap-2" disabled>
            <MessageSquare className="w-4 h-4" />
            Coming Soon!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage; 