import { ShoppingBag, Sparkles } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Icon container with pulse effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-20 animate-ping"></div>
          <ShoppingBag className="w-16 h-16 text-primary relative z-10" />
          <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
        </div>

        {/* Loading text with gradient */}
        <div className="text-center">
          <p className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Preparing BuyHive
          </p>
          <p className="text-gray-600 mt-2 font-medium">
            Your shopping experience is loading...
          </p>
        </div>

        {/* Progress bar style loader */}
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full animate-progress"></div>
        </div>

        {/* Rotating dots */}
        <div className="flex space-x-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-4 h-4 bg-gradient-to-br from-primary to-blue-600 rounded-full animate-rotate-scale"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes rotate-scale {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
        .animate-rotate-scale {
          animation: rotate-scale 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
