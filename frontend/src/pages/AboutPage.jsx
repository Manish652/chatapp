import { MessageSquare, Users, Shield, Globe } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "1M+", label: "Messages Sent" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About echoLine</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            echoLine is a modern messaging platform designed to bring people closer together through seamless communication.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-base-200">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect People</h3>
              <p className="text-base-content/70">
                We believe in the power of communication to bring people together, no matter where they are in the world.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-base-200">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-base-content/70">
                Your privacy is our top priority. We use end-to-end encryption to ensure your conversations stay private.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-base-200">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-base-content/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-base-200 mx-auto mb-4"><img className='rounded-full w-full h-full object-cover ' src="me2.jpg" alt=""/></div>
              <h3 className="text-xl font-semibold mb-2">Manish Bhunia</h3>
              <p className="text-base-content/70">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-base-200 mx-auto mb-4"><img className='rounded-full w-full h-full object-cover ' src="m3.jpg" alt=""/></div>
              <h3 className="text-xl font-semibold mb-2">Manish</h3>
              <p className="text-base-content/70">Lead Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-base-200 mx-auto mb-4"><img className='rounded-full w-full h-full object-cover ' src="avatar.png" alt=""/></div>
              <h3 className="text-xl font-semibold mb-2">Mike Johnson</h3>
              <p className="text-base-content/70">UX Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 