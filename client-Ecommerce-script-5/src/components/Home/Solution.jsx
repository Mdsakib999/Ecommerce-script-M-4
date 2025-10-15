import React from 'react';
import { ArrowRight, Shield, Truck, Heart, Zap, Users, CreditCard, Smartphone } from 'lucide-react';
import Button from '../ui/Button';
import Countup from '../shared/Countup';
const Solution = () => {
  const solutions = [
    {
      text: "Seamless online and offline shopping experience",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500"
    },
    {
      text: "Quality assurance across all product categories",
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      text: "Fast delivery with real-time order tracking",
      icon: Truck,
      color: "from-orange-500 to-red-500"
    },
    {
      text: "User-friendly interface for all age groups",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      text: "24/7 customer support and assistance",
      icon: Heart,
      color: "from-rose-500 to-pink-500"
    },
    {
      text: "Secure payment gateway with multiple options",
      icon: CreditCard,
      color: "from-indigo-500 to-purple-500"
    },
    {
      text: "Personalized recommendations based on preferences",
      icon: Zap,
      color: "from-yellow-500 to-orange-500"
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
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Redefining Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Shopping Experience
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50">
                We've built a comprehensive ecommerce platform that blends cutting-edge technology 
                with exceptional service. Our focus on quality, reliability, and customer satisfaction 
                ensures every shopping journey is seamless, secure, and delightful.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"><Countup>99</Countup>%</div>
                <div className="text-sm text-gray-600 mt-1">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"><Countup>1</Countup>M+</div>
                <div className="text-sm text-gray-600 mt-1">Customers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Solution Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gradient Border Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10"></div>
                  
                  <div className="flex items-start space-x-4">
                    {/* Icon with Gradient Background */}
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Solution Text */}
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                        {solution.text}
                      </p>
                    </div>

                    {/* Animated Arrow */}
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 pt-16 border-t border-gray-200/50">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-gray-200/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
              <div className="text-center lg:text-left max-w-2xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Experience the{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Difference?
                  </span>
                </h3>
                <p className="text-gray-600 text-lg">
                  Join our community of satisfied customers who trust our platform for their shopping needs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  to="/contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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