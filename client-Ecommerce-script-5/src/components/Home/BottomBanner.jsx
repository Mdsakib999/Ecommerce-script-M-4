import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
export default function BottomBanner() {
  return (
    // Bottom Promotional Banner
    <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-500/20"></div>

      <div className="relative z-10 px-8 py-6 flex flex-wrap items-center justify-between gap-6">
        {/* Left Side - Event Info */}
        <div className="flex flex-wrap items-center space-x-6">
          <div className="text-white">
            <div className="text-5xl font-black leading-none mb-1">10.10</div>
            <div className="text-lg font-bold uppercase tracking-wide bg-white/20 px-3 py-1 rounded">
              BRAND RUSH
            </div>
          </div>

          {/* Product Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {["🥤", "📱", "🍪", "🧴", "🎧"].map((emoji, i) => (
              <div
                key={i}
                className="bg-white rounded-xl w-16 h-16 flex items-center justify-center text-2xl shadow-lg transform hover:scale-110 transition-all duration-200"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Center - Timing */}
        <div className="hidden md:block bg-black text-white px-6 py-3 rounded-lg transform -skew-x-6">
          <div className="skew-x-6">
            <p className="text-sm uppercase tracking-wider mb-1">STARTS ON</p>
            <p className="text-2xl font-bold">9 OCT / 8 PM</p>
          </div>
        </div>

        {/* Right Side - CTA */}
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-full flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 animate-pulse">
          <Link to="products">
            <span className="text-xl">SHOP NOW</span>
          </Link>
          <div className="bg-white rounded-full p-2">
            <ChevronRight className="w-6 h-6 text-red-600" />
          </div>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-red-500 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
}
