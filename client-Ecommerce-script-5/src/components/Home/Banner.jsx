import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "50% off",
      title: "WHAT'S HAPPENING",
      subtitle: "Endless Prizes, Unbeatable Prices",
      backgroundImage: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&h=600&fit=crop&crop=center",
      productImage:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760520895/products/umubcdzvmzabpnk6orpn.jpg?w=400&h=400&fit=crop",
      gradient: "from-purple-300 via-purple-200 to-pink-200",
      productType: "headphones",
    },
    {
      id: 2,
      badge: "flash sales",
      title: "MEGA DEALS",
      subtitle: "Limited Time Offers, Maximum Savings",
      backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&crop=center",
      productImage:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521070/products/vxsssdax4idhkk4ousre.avif?w=400&h=400&fit=crop",
      gradient: "from-blue-300 via-blue-200 to-cyan-200",
      productType: "smart watches",
    },
    {
      id: 3,
      badge: "new arrivals",
      title: "TRENDING NOW",
      subtitle: "Fresh Styles Just Dropped",
      backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
      productImage:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760522754/products/nlfp3uc0rb7muk65aecg.jpg?w=400&h=400&fit=crop",
      gradient: "from-orange-200 via-orange-300 to-red-200",
      productType: "basketball shoes",
    },
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
    <div className="">
      <div className="relative min-h-[600px] lg:max-h-[800px] flex bg-gray-900">
        {/* Main Slider Container */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background Images with Transitions */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
{/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`}></div>
            
            {/* Dark Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}

          {/* Content Container */}
          <div className="relative z-20 h-full pb-16 lg:pb-0 flex items-center">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text Content */}
                <div className="text-white space-y-6 lg:space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-lg px-4 mt-12 lg:mt-0 py-2 rounded-full border-2 border-white/30 shadow-2xl">
                    <span className="text-white font-black text-lg  tracking-wider">
                      {slides[activeSlide].badge}
                    </span>
                  </div>

                  {/* Main Text Content */}
                  <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white leading-[0.9]">
                      {slides[activeSlide].title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold opacity-95 max-w-2xl">
                      {slides[activeSlide].subtitle}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="w-max">
                    <Link to="/products">
                      <button className="bg-indigo-300 hover:bg-ultra-violet text-gray-700 hover:text-white font-black px-8 py-4 rounded-xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group cursor-pointer">
                        <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span>Shop Now</span>
                      </button>
                    </Link>
                  </div>

                  {/* Slide Indicators for Mobile */}
                  <div className="flex absolute bottom-4 lg:hidden space-x-3 pt-4">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeSlide === index
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Side - Product Image */}
                <div className="relative lg:block">
                  <div className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                    {/* Floating Product Container */}
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl py-16 px-8 border-2 border-white/20 shadow-2xl">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-64 h-64 mx-auto transform hover:scale-105 transition-transform duration-500">
                        <img
                          src={slides[activeSlide].productImage}
                          alt={slides[activeSlide].productType}
                          className="w-full h-full object-cover rounded-2xl shadow-2xl"
                        />
{/* Floating Discount Badge */}
                      <div className="absolute -top-4 -right-0 sm:-right-4 bg-red-500 text-white font-black px-4 py-2 rounded-xl shadow-lg transform rotate-12 animate-pulse">
                        50% OFF
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
                      {/* Floating Elements */}
                      <div className="absolute -top-6 left-0 sm:-left-6 bg-green-400 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform -rotate-12 animate-bounce">
                        FREE SHIPPING
                      </div>
                      <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-blue-400 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform rotate-12 animate-bounce delay-1000">
                        HOT DEAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute opacity-0 sm:opacity-100 left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 z-30 hover:scale-110 shadow-2xl border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute opacity-0 sm:opacity-100 right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white p-4 rounded-full transition-all duration-300 z-30 hover:scale-110 shadow-2xl border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute opacity-0 md:opacity-100 bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex space-x-3 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
                  activeSlide === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <BottomBanner /> */}
    </div>
  );
}
