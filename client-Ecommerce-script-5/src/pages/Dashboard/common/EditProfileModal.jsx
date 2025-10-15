import { Plus, X, User, Mail, Phone, MapPin, Camera, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../redux/app/services/user/userApi";
import toast from "react-hot-toast";

export default function EditProfileModal({
  editProfile,
  editImage,
  // loginMethod,
  openModal,
  setOpenModal,
  setEditImage,
  handleSave,
}) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: editProfile.name,
      email: editProfile.email,
      phone: editProfile.phone || "",
      address: editProfile.address || "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset({
      name: editProfile.name,
      email: editProfile.email,
      phone: editProfile.phone || "",
      address: editProfile.address || "",
      password: "",
      confirmPassword: "",
    });
  }, [editProfile, reset]);

  if (!openModal) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setEditImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setEditImage("");
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setEditImage(editProfile.picture);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Only append editable fields
    if (data.name) formData.append("name", data.name);
    if (data.phone) formData.append("phone", data.phone);
    if (data.address) formData.append("address", data.address);
    if (data.password) formData.append("password", data.password);

    if (selectedImage) formData.append("image", selectedImage);

    try {
      const result = await updateUser({
        userId: editProfile._id,
        userInfo: formData,
      }).unwrap();

      if (result.success) {
        handleSave({
          ...editProfile,
          ...data,
          picture: editImage || editProfile.picture,
        });
        toast.success(
          <h1 className="font-serif">Profile updated successfully</h1>,
          {
            position: "bottom-right",
          }
        );
        setOpenModal(false);
      }
    } catch {
      toast.error(<h1 className="font-serif">Profile update failed</h1>, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div
      onClick={() => setOpenModal(!openModal)}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4"
      style={{ minHeight: 0 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto border border-white/20"
        style={{ minHeight: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Edit Profile
              </h2>
              <p className="text-sm text-gray-600 font-medium">
                Update your personal information
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            <div className="relative group">
              <div
                onClick={() => !isLoading && fileInputRef.current.click()}
                className={`w-32 h-32 rounded-3xl shadow-2xl cursor-pointer overflow-hidden border-4 border-white/50 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-50 hover:to-purple-50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "group"
                }`}
              >
                {editImage ? (
                  <img
                    src={editImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                )}
                {/* Camera Icon Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-all duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" />
                </div>
              </div>
              
              {/* Add Photo Badge */}
              {!editImage && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Plus className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            {editImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                disabled={isLoading}
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                Full Name
              </label>
              <input
                {...register("name", {
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                  errors.name
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200 hover:border-gray-300"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                Email Address
              </label>
              <input
                type="email"
                value={editProfile.email}
                disabled
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl bg-gray-100/50 text-gray-500 cursor-not-allowed backdrop-blur-sm"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <Phone className="w-4 h-4 text-purple-500" />
                Phone Number
              </label>
              <input
                {...register("phone", {
                  pattern: {
                    value: /^[0-9+\-\s()]*$/,
                    message: "Invalid phone number",
                  },
                })}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                  errors.phone
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200 hover:border-gray-300"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Address
              </label>
              <input
                {...register("address", {
                  maxLength: {
                    value: 100,
                    message: "Address cannot exceed 100 characters",
                  },
                })}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                  errors.address
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200 hover:border-gray-300"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                placeholder="Enter your address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm font-medium mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Secure Update
                </p>
                <p className="text-xs text-blue-600">
                  Your information is protected and encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/50">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}