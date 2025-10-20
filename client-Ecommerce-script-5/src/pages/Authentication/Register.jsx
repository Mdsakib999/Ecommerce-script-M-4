import { Eye, EyeOff, Lock, Mail, Shield, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import googleLogo from "../../assets/googleLogo.png";
import registerImage from "../../assets/register.jpg"; // You might want a different image
import Logo from "../../components/shared/Logo";
import { useRegisterUserMutation } from "../../redux/app/services/user/userApi";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleRegister = () => {
    setIsGoogleLoading(true);
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      toast.error(<h1 className="font-serif">{error}</h1>, {
        position: "bottom-right",
      });

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();

      if (res?.success) {
        toast.success(
          <p className="font-serif">Account created successfully!</p>,
          {
            position: "bottom-right",
          }
        );
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Something went wrong";

      if (errorMessage === "Email already exists") {
        toast.error(
          <h1 className="font-serif">Email is already registered</h1>,
          {
            position: "bottom-right",
          }
        );
      } else {
        toast.error(<h1 className="font-serif">{errorMessage}</h1>, {
          position: "bottom-right",
        });
      }
    }
  };

  const password = watch("password");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500/90 z-10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
        </div>
        <img
          src={registerImage}
          alt="Shopping illustration"
          className="object-cover h-full w-full transform scale-105"
        />
        {/* Overlay Content */}
        <div className="absolute z-20 text-white p-12 max-w-lg">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h1 className="text-4xl font-black mb-4 leading-tight">
              Join <span className="text-yellow-300">BuyHive</span> Today
            </h1>
            <p className="text-white/90 text-lg font-medium leading-relaxed">
              Start your shopping journey with exclusive member benefits,
              personalized deals, and a seamless shopping experience designed
              just for you.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Shield className="w-6 h-6 text-green-300" />
              <span className="text-white/80 font-medium">
                Secure & Protected Registration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 py-4 px-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <Logo w="160px" />
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Create Account
            </div>
            <p className="text-gray-600 font-medium">
              Join our community and unlock exclusive benefits
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <User className="w-4 h-4 text-green-500" />
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type="text"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="relative w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
                  placeholder="Enter your full name"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm font-medium mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="relative w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
                  placeholder="Enter your email address"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm font-medium mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-500" />
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="relative w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
                  placeholder="Create a password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm font-medium mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="relative w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
                  placeholder="Confirm your password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300 z-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm font-medium mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              disabled={isLoading || isGoogleLoading}
              type="submit"
              className={`flex mx-auto mt-8 items-center ease-in-out duration-300 transition-all text-md justify-center w-full rounded-xl bg-transparent py-4 px-4 border border-indigo-400 text-indigo-400 hover:bg-indigo-400 font-semibold hover:text-white hover:border-transparent hover:shadow-xl transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 gap-3 ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleRegister}
              type="button"
              disabled={isGoogleLoading || isLoading}
              className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isGoogleLoading ? "animate-pulse" : ""
              }`}
            >
              <img src={googleLogo} alt="google" className="w-6 h-6" />
              <span>
                {isGoogleLoading ? "Connecting..." : "Sign up with Google"}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200/50">
            <p className="text-gray-600 font-medium">
              Already have an account?
              <Link
                to="/login"
                className="text-green-500 hover:text-green-600 font-bold hover:underline ml-2 transition-all duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
