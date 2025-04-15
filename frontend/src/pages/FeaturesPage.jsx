import { MessageSquare, Users, Shield, Bell, Settings, Image, Smile } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with our lightning-fast chat system."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Chats",
      description: "Create and manage group conversations with multiple participants."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "Your messages are secure with our advanced encryption technology."
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Get notified only for important messages with our intelligent notification system."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customizable Settings",
      description: "Personalize your chat experience with our extensive settings options."
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Media Sharing",
      description: "Share images, videos, and files with ease."
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: "Emoji Support",
      description: "Express yourself with our extensive emoji and sticker collection."
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Features</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover the powerful features that make echoLine the perfect messaging platform for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-base-content/70 mb-6">
            Join thousands of users who are already enjoying echoLine's features.
          </p>
          <button className="btn btn-primary">
            Start Messaging Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage; 