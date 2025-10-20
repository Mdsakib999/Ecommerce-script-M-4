import {
  TrendingUp,
  ArrowRight,
  CreditCard,
  Heart,
  Shield,
  Smartphone,
  Truck,
  Package,
  Headphones,
  Users,
  Zap,
} from "lucide-react";
import Countup from "../shared/Countup";
import Button from "../ui/Button";
const Solution = () => {
const features = [
    {
      icon: TrendingUp,
      title: "Smart Recommendations",
      description: "Discover products tailored to your preferences with AI-powered suggestions that enhance your shopping experience"
    },
    {
      icon: Package,
      title: "Fast Delivery",
      description: "Get your orders quickly with flexible shipping options, real-time tracking, and guaranteed delivery dates"
    },
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "Shop with confidence using industry-leading encryption and multiple payment options for safe transactions"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Receive expert assistance 24/7 to ensure a seamless shopping experience from browse to delivery"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Solution Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
        <h2 className="text-2xl p-2 md:text-4xl bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent font-semibold">
          Redefining Your <br /> Shopping Experiance
        </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50">
                We've built a comprehensive ecommerce platform that blends
                cutting-edge technology with exceptional service. Our focus on
                quality, reliability, and customer satisfaction ensures every
                shopping journey is seamless, secure, and delightful.
              </p>
            </div>

            {/* Stats */}
            <div className="grid ml-4 grid-cols-3 gap-6 pt-4">
              <div className="">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                  <Countup>99</Countup>%
                </div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-gray-600 mt-1">Support</div>
              </div>
              <div className="">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
                  <Countup>1</Countup>M+
                </div>
                <div className="text-sm text-gray-600 mt-1">Customers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Solution Points */}
      <div className="w-full px-4 sm:px-8 py-8">
        <div className="space-y-8 flex flex-col">
          {features.map((feature, index) => (
            <div key={index} className="space-y-3 p-4 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-indigo-900 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 pt-16 border-t border-gray-200/50">
          <div className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-3xl p-8 md:p-12 border border-gray-200/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
              <div className="text-center lg:text-left max-w-2xl">
                <h3 className="text-2xl p-2 md:text-4xl bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent font-semibold">
                  Ready to Experience the
                    Difference?
                </h3>
                <p className="text-gray-600 pl-2 text-lg">
                  Join our community of satisfied customers who trust us for their shopping needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  to="/contact"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Shopping Now
                </Button>
                <Button
                  to="/about"
                  className="bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
