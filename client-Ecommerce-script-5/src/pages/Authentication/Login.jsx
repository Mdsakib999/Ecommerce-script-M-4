import { Eye, EyeOff, Lock, Mail, Shield, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import googleLogo from "../../assets/googleLogo.png";
import loginImage from "../../assets/login.jpg";
import Logo from "../../components/shared/Logo";
import { useLoginMutation } from "../../redux/app/services/auth/authApi";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };

  const [login, { isLoading }] = useLoginMutation();

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
      const res = await login(data).unwrap();

      if (res?.success) {
        toast.success(<p className="font-serif">Logged in successfully</p>, {
          position: "bottom-right",
        });
        navigate("/");
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Something went wrong";

      if (errorMessage === "Password does not match") {
        toast.error(<h1 className="font-serif">Invalid credentials</h1>, {
          position: "bottom-right",
        });
      } else if (errorMessage === "User is not verified") {
        toast.error(
          <h1 className="font-serif">Your account is not verified</h1>,
          {
            position: "bottom-right",
          }
        );
      } else if (
        errorMessage === "You have authenticated through Google login!"
      ) {
        toast.error(
          <h1 className="font-serif">You are authenticated through Google!</h1>,
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary z-10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
        </div>
        <img
          src={loginImage}
          alt="Shop illustration"
          className="object-cover h-full w-full transform scale-105"
        />
        {/* Overlay Content */}
        <div className="absolute z-20 text-white p-12 max-w-lg">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h1 className="text-4xl font-black mb-4 leading-tight">
              Welcome Back to <span className="text-yellow-300">BuyHive</span>
            </h1>
            <p className="text-white/90 text-lg font-medium leading-relaxed">
              Continue your shopping journey with exclusive deals and
              personalized recommendations tailored just for you.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Shield className="w-6 h-6 text-green-300" />
              <span className="text-white/80 font-medium">
                Secure & Encrypted Login
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <Logo w="100px" />
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Welcome Back
            </div>
            <p className="text-gray-600 font-medium">
              Enter your credentials to access your personalized dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="relative w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
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
                <Lock className="w-4 h-4 text-purple-500" />
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="relative w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
                  placeholder="Enter your password"
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

            {/* Sign In Button */}

            <button
              disabled={isLoading || isGoogleLoading}
              type="submit"
              className={`flex mx-auto mt-8 items-center ease-in-out duration-300 transition-all  text-md justify-center w-full rounded-xl bg-transparent py-4  px-4 border border-primary text-primary hover:bg-primary font-semibold hover:text-white hover:border-transparent hover:shadow-xl transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 gap-3 ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Sign In to Account
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 font-medium text-sm">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={isGoogleLoading || isLoading}
              className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isGoogleLoading ? "animate-pulse" : ""
              }`}
            >
              <img src={googleLogo} alt="google" className="w-6 h-6" />
              <span>
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
            <p className="text-gray-600 font-medium">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-500 font-bold hover:underline ml-2 transition-all duration-300"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
