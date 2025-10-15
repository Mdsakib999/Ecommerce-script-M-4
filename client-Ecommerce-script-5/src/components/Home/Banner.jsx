import { ChevronLeft, ChevronRight, ShoppingCart, Star, Truck, Clock, Download } from "lucide-react";
import { useState, useEffect } from "react";
import BottomBanner from "./BottomBanner";
import {Link} from 'react-router';
export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "10.10 BRAND RUSH",
      title: "WHAT'S HAPPENING",
      subtitle: "Endless Prizes, Unbeatable Prices",
      backgroundImage: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&h=600&fit=crop&crop=center",
      productImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      gradient: "from-purple-600 via-purple-500 to-pink-500",
      productType: "sunglasses"
    },
    {
      id: 2,
      badge: "FLASH SALE",
      title: "MEGA DEALS",
      subtitle: "Limited Time Offers, Maximum Savings",
      backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&crop=center",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      productType: "headphones"
    },
    {
      id: 3,
      badge: "NEW ARRIVALS",
      title: "TRENDING NOW",
      subtitle: "Fresh Styles Just Dropped",
      backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      gradient: "from-orange-500 via-orange-400 to-red-500",
      productType: "shoes"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
<div>
    <div className="relative min-h-[600px] max-h-[800px] flex bg-gray-900">
      {/* Main Slider Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Images with Transitions */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}></div>
            
            {/* Dark Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="text-white space-y-6 lg:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-lg px-6 py-3 rounded-2xl border-2 border-white/30 shadow-2xl">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white font-black text-lg uppercase tracking-wider">
                    {slides[activeSlide].badge}
                  </span>
                </div>

                {/* Main Text Content */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9]">
                    {slides[activeSlide].title}
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold opacity-95 max-w-2xl">
                    {slides[activeSlide].subtitle}
                  </p>
                </div>

                {/* CTA Button */}
              <Link to="/products">
                              <button className="bg-secondary hover:bg-space-cadet text-gray-900 hover:text-white font-black px-10 py-5 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group">
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>Add to Cart</span>
                </button>
              </Link>

                {/* Slide Indicators for Mobile */}
                <div className="flex lg:hidden space-x-3 pt-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Side - Product Image */}
              <div className="relative lg:block">
                <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                  {/* Floating Product Container */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
                    {/* Product Image */}
                    <div className="relative w-64 h-64 mx-auto transform hover:scale-105 transition-transform duration-500">
                      <img
                        src={slides[activeSlide].productImage}
                        alt={slides[activeSlide].productType}
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      />
                      
                      {/* Floating Discount Badge */}
                      <div className="absolute -top-4 -right-4 bg-red-500 text-white font-black px-4 py-2 rounded-xl shadow-lg transform rotate-12 animate-pulse">
                        50% OFF
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-gray-900 font-bold px-3 py-2 rounded-xl shadow-lg flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span>4.8</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center mt-8 space-y-3">
                      <h3 className="text-white text-2xl font-bold capitalize">
                        Premium {slides[activeSlide].productType}
                      </h3>
                      <p className="text-white/80 text-lg">
                        Limited Stock Available
                      </p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-6 -left-6 bg-green-400 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform -rotate-12 animate-bounce">
                    FREE SHIPPING
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform rotate-12 animate-bounce delay-1000">
                    HOT DEAL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 z-30 hover:scale-110 shadow-2xl border border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white p-4 rounded-full transition-all duration-300 z-30 hover:scale-110 shadow-2xl border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
                activeSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    <BottomBanner />
</div>
  );
}