import { Clock, MapPin, Shield, Truck } from "lucide-react";
import Button from "../ui/Button";

export default function SubHeader({isScrolled}) {
  return (
    <div 
      className={`bg-gradient-to-r from-blue-50 via-indigo-50 to-indigo-50 border-b border-blue-100/50 relative overflow-hidden transition-all duration-500 ease-in-out ${
    isScrolled 
      ? 'opacity-0 h-0 max-h-0 py-0' 
      : 'opacity-100 h-auto max-h-20 py-3'
  }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-200/15 rounded-full blur-lg animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-1">
          {/* Additional info badges */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-green-100/50">
              <Truck className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-gray-600">
                Free Delivery
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-orange-100/50">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-medium text-gray-600">
                24/7 Support
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-blue-100/50">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-600">
                Secure Payment
              </span>
            </div>
          </div>

          {/* Navigation buttons - Enhanced styling */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              type="outline"
              to="/"
              className="bg-white/80 backdrop-blur-sm border-blue-200/50 text-gray-700 hover:bg-white hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all duration-300 font-medium rounded-xl px-4 py-2 text-sm"
            >
              Home
            </Button>
            <Button
              type="outline"
              to="/products"
              className="bg-white/80 backdrop-blur-sm border-blue-200/50 text-gray-700 hover:bg-white hover:border-blue-300 hover:shadow-md hover:scale-105 transition-all duration-300 font-medium rounded-xl px-4 py-2 text-sm"
            >
              Products
            </Button>
            <Button type="outline" to="/about" className="">
              About
            </Button>
            <Button
              type="outline"
              to="/track-order"
              className="bg-white/80 backdrop-blur-sm border-green-200/50 text-gray-700 hover:bg-white hover:border-green-300 hover:shadow-md hover:scale-105 transition-all duration-300 font-medium rounded-xl px-4 py-2 text-sm"
            >
              Track Order
            </Button>
            <Button
              type="outline"
              to="/faq"
              className="bg-white/80 backdrop-blur-sm border-orange-200/50 text-gray-700 hover:bg-white hover:border-orange-300 hover:shadow-md hover:scale-105 transition-all duration-300 font-medium rounded-xl px-4 py-2 text-sm"
            >
              FAQ
            </Button>
            <Button
              type="outline"
              to="/contact"
              className="bg-white/80 backdrop-blur-sm border-indigo-200/50 text-gray-700 hover:bg-white hover:border-indigo-300 hover:shadow-md hover:scale-105 transition-all duration-300 font-medium rounded-xl px-4 py-2 text-sm"
            >
              Contact
            </Button>
          </div>

          {/* Mobile quick info */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 border border-blue-100">
              <Truck className="w-3 h-3 text-green-500" />
              <span className="text-xs font-medium text-gray-600">
                Free Delivery
              </span>
            </div>
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 border border-blue-100">
              <Shield className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-medium text-gray-600">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
