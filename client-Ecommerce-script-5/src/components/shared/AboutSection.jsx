import { CheckCircle, Sparkles, Zap } from "lucide-react";
import Countup from "../shared/Countup";
// Mock InfoOne and InfoTwo components
const InfoOne = () => (
  <div className="space-y-4">
    {[
      {
        icon: CheckCircle,
        text: "Premium Quality Products",
        color: "text-blue-600",
      },
      { icon: Zap, text: "Fast & Secure Delivery", color: "text-indigo-600" },
      {
        icon: CheckCircle,
        text: "24/7 Customer Support",
        color: "text-pink-600",
      },
    ].map((item, i) => (
      <div key={i} className="flex items-center space-x-3 group">
        <div
          className={`${item.color} bg-white rounded-lg p-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <item.icon className="w-5 h-5" />
        </div>
        <span className="text-gray-700 font-semibold group-hover:text-indigo-600 transition-colors duration-300">
          {item.text}
        </span>
      </div>
    ))}
  </div>
);

const InfoTwo = () => (
  <div className="grid grid-cols-2 gap-4">
    {[
      {
        value: "10+",
        label: "Years Experience",
        color: "from-blue-500 to-cyan-500",
      },
      {
        value: "50K+",
        label: "Happy Customers",
        color: "from-indigo-500 to-pink-500",
      },
      { value: "100+", label: "Products", color: "from-orange-500 to-red-500" },
      {
        value: "99%",
        label: "Satisfaction",
        color: "from-green-500 to-emerald-500",
      },
    ].map((stat, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      >
        <div
          className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
        >
          {stat.value}
        </div>
        <div className="text-xs text-gray-600 font-semibold">{stat.label}</div>
      </div>
    ))}
  </div>
);

export default function AboutSection({
  preheading = "Our Story",
  heading = "Building Excellence Since 2010",
  normaltext = "We are committed to delivering the highest quality products and exceptional customer service. Our journey began with a simple mission: to make premium products accessible to everyone.",
  image = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  reverse = false,
}) {
  return (
    <div className="relative w-full bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-16 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 flex max-w-7xl mx-auto flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 text-left px-4 sm:px-6 lg:px-8">
        {/* Content Section */}
        <div
          className={`about-content flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 md:w-3/5 w-full ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Decorative Corner Element */}
          <div className="absolute -top-4 -left-4 w-20 h-20 border-l-4 border-t-4 border-indigo-300 rounded-tl-3xl opacity-50"></div>

          {/* Pre-heading with Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-blue-100 border border-indigo-200 rounded-full px-4 py-2 w-fit shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <h6 className="text-sm sm:text-base font-bold text-indigo-700 uppercase tracking-wider">
              {preheading}
            </h6>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight relative">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent">
              {heading}
            </span>
            {/* Animated Underline */}
            <div className="absolute -bottom-2 left-0 w-24 sm:w-32 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 rounded-full"></div>
          </h1>

          {/* Description Text */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed w-full lg:w-4/5 font-medium">
            {normaltext}
          </p>

          {/* Info Components with Enhanced Styling */}
          {reverse ? (
            <div className="mt-4 sm:mt-6">
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full p-2 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <InfoTwo />
              </div>
            </div>
          ) : (
            <div className="mt-4 sm:mt-6">
              <div className="relative bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 shadow-lg border border-indigo-100">
                <InfoOne />
              </div>
            </div>
          )}

          {/* Decorative Bottom Corner */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-4 border-b-4 border-blue-300 rounded-br-3xl opacity-50"></div>
        </div>

        {/* Image Section */}
        <div
          className={`image-content w-full md:w-2/5 mx-auto ${
            reverse ? "md:order-1" : "md:order-2"
          }`}
        >
          <div className="relative group">
            {/* Decorative Background Shape */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-pink-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

            {/* Main Image Container */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-white group-hover:border-indigo-200 transition-all duration-500">
              <img
                src={image}
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                alt="about-image"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:translate-x-full transition-all duration-1000 -translate-x-full"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border-2 border-indigo-200 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full p-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Trusted By
                  </div>
                  <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    <Countup>50</Countup>K+
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-l-4 border-t-4 border-indigo-500 rounded-tl-lg"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}
