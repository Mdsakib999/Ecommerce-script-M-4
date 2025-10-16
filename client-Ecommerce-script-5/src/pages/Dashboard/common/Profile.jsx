import {
  Plus,
  ShieldCheck,
  ShieldCheckIcon,
  User,
  UserPen,
  Mail,
  Phone,
  MapPin,
  Crown,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";
import EditProfileModal from "./EditProfileModal";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const { data: userInfo } = useUserInfoQuery();
  const user = useMemo(() => userInfo?.data || {}, [userInfo?.data]);
  // const loginMethod = user.auths?.[0]?.provider;

  const { name = "", email = "", picture = "", role } = user;

  const [profile, setProfile] = useState({
    _id: user?._id,
    name,
    email,
    picture,
    role,
    phone: "",
    address: "",
  });

  const [editProfile, setEditProfile] = useState({
    ...profile,
    password: "",
    confirmPassword: "",
  });

  const [editImage, setEditImage] = useState(profile.picture);

  useEffect(() => {
    setProfile({
      _id: user?._id,
      name: user?.name || "",
      email: user?.email || "",
      picture: user?.picture || "",
      role: user?.role || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEditProfile((prev) => ({
      ...prev,
      ...user,
      password: "",
      confirmPassword: "",
    }));
    setEditImage(user.picture || "");
  }, [user]);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditProfile(updatedProfile);
    setEditImage(updatedProfile.picture);
    setOpenModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-0 sm:px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Profile Header */}
        <div className="relative bg-indigo-400 p-8">
          {/* Background Pattern */}     
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <button
                onClick={() => setOpenModal(true)}
                className="w-32 h-32 rounded-3xl shadow-2xl cursor-pointer overflow-hidden border-4 border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              >
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full bg-white/20 rounded-2xl">
                    <User size={48} className="text-white/80" />
                  </div>
                )}
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-2 rounded-2xl border border-white/30">
                  <div className="flex items-center gap-2">
                    {role?.toLowerCase() === "admin" ? (
                      <>
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-bold text-sm">
                          {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
                        </span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-sm">
                          {role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <h4 className="text-3xl font-black text-white mb-2">
                {profile.name}
              </h4>
              <p className="text-white/80 font-medium">
                Welcome to your profile dashboard
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/30 flex items-center gap-2 group"
            >
              <UserPen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-4 sm:p-8 lg:p-10">
          <div className="mb-10">
            <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Personal Information
            </h1>
            <p className="text-gray-600 font-medium mt-2">
              Manage your account details and contact information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Name */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="space-y-1">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Full Name
                    </h2>
                    <p className="text-gray-700 text-md sm:text-lg font-bold">
                      {profile.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 space-y-1">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Address
                    </h2>
                    {profile.address ? (
                      <p className="text-gray-700 text-md sm:text-lg font-bold">
                        {profile.address}
                      </p>
                    ) : (
                      <button
                        onClick={() => setOpenModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-all duration-300 hover:gap-3 group"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-4 h-4 text-blue-600" />
                        </div>
                        Add Address
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-y-1 gap-3 mb-3">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Email Address
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-lg font-bold">
                      {profile.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 space-y-1">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Phone Number
                    </h2>
                    {profile.phone ? (
                      <p className="text-gray-900 text-lg font-bold">
                        {profile.phone}
                      </p>
                    ) : (
                      <button
                        onClick={() => setOpenModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-all duration-300 hover:gap-3 group"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-4 h-4 text-blue-600" />
                        </div>
                        Add Number
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        editImage={editImage}
        setEditImage={setEditImage}
        // loginMethod={loginMethod}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSave={handleSave}
      />
    </div>
  );
}