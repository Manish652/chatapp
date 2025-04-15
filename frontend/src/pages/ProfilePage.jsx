import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  // Sync updated profile picture with state
  useEffect(() => {
    if (authUser?.profilepic) {
      setSelectedImg(authUser.profilepic);
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        toast.error("Failed to update profile picture. Please try again.");
        setSelectedImg(authUser?.profilepic || null);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read image file. Please try again.");
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200/50 to-base-100 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-base-content/70 mt-2">
            Manage your personal information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr,1.5fr]">
          {/* Left Column - Avatar and Account Status */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden">
              <div className="card-body items-center text-center p-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-2 ring-offset-base-100">
                    <img
                      src={selectedImg || "/avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${authUser?.fullName || 'User'}`}
                    />
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-0 right-0 
                      bg-primary hover:bg-primary-focus
                      p-3 rounded-full cursor-pointer shadow-lg
                      transition-all duration-200 transform
                      group-hover:scale-110
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-primary-content" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{authUser?.fullName}</h2>
                  <p className="text-base-content/60 text-sm mt-1">{authUser?.email}</p>
                </div>
                <div className="w-full mt-4">
                  <div className="bg-base-200/50 rounded-full px-4 py-2 text-sm flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-success rounded-full"></span>
                    <span>Active Account</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden">
              <div className="card-body p-6">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-base-200/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-base-content/70" />
                      <span>Member Since</span>
                    </div>
                    <span className="font-medium">{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-base-200/50">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-base-content/70" />
                      <span>Status</span>
                    </div>
                    <span className="font-medium text-success flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-success rounded-full"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="space-y-6">
            {/* Profile Info Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden">
              <div className="card-body p-6">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="bg-base-200 rounded-lg px-4 py-3 w-full border border-base-300 focus-within:border-primary transition-colors">
                        <p className="font-medium">{authUser?.fullName || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-base-content/70 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="bg-base-200 rounded-lg px-4 py-3 w-full border border-base-300 focus-within:border-primary transition-colors">
                        <p className="font-medium">{authUser?.email || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-base-200">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-base-content/70">Account Security</h4>
                      <button className="btn btn-outline w-full justify-between">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Change Password
                        </span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden">
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verification Status
                  </h3>
                  <div className="badge badge-success gap-1">
                    <span className="inline-block w-2 h-2 bg-success-content rounded-full"></span>
                    Verified
                  </div>
                </div>
                
                <div className="mt-4 bg-base-200/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-success mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email Verified</h4>
                      <p className="text-sm text-base-content/70 mt-1">
                        Your email address has been successfully verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;