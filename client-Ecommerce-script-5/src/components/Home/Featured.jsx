import { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Speaker,
  Gamepad2,
  Laptop,
  Tablet,
  Sparkles,
  Zap
} from 'lucide-react';
import Countup from '../shared/Countup';

const Featured = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: 'Smartphones',
      items: 24,
      icon: Smartphone,
      image:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-slate-900 via-slate-800 to-slate-700',
      iconColor: 'text-slate-200',
      shadowColor: 'shadow-slate-500/30',
      glowColor: 'hover:shadow-slate-500/40'
    },
    {
      id: 2,
      name: 'Audio & Headphones',
      items: 18,
      icon: Headphones,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-purple-600 via-purple-700 to-purple-800',
      iconColor: 'text-purple-100',
      shadowColor: 'shadow-purple-500/40',
      glowColor: 'hover:shadow-purple-500/60',
      featured: true
    },
    {
      id: 3,
      name: 'Cameras',
      items: 12,
      icon: Camera,
      image:
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      iconColor: 'text-emerald-100',
      shadowColor: 'shadow-emerald-500/40',
      glowColor: 'hover:shadow-emerald-500/60'
    },
    {
      id: 4,
      name: 'Smart Watches',
      items: 16,
      icon: Watch,
      image:
        'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-rose-500 via-rose-600 to-pink-600',
      iconColor: 'text-rose-100',
      shadowColor: 'shadow-rose-500/40',
      glowColor: 'hover:shadow-rose-500/60'
    },
    {
      id: 5,
      name: 'Speakers',
      items: 14,
      icon: Speaker,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-amber-500 via-amber-600 to-orange-600',
      iconColor: 'text-amber-100',
      shadowColor: 'shadow-amber-500/40',
      glowColor: 'hover:shadow-amber-500/60'
    },
    {
      id: 6,
      name: 'Gaming Accessories',
      items: 22,
      icon: Gamepad2,
      image:
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-indigo-500 via-indigo-600 to-purple-600',
      iconColor: 'text-indigo-100',
      shadowColor: 'shadow-indigo-500/40',
      glowColor: 'hover:shadow-indigo-500/60'
    },
    {
      id: 7,
      name: 'Laptops & PCs',
      items: 20,
      icon: Laptop,
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-gray-700 via-gray-800 to-gray-900',
      iconColor: 'text-gray-200',
      shadowColor: 'shadow-gray-500/30',
      glowColor: 'hover:shadow-gray-500/50'
    },
    {
      id: 8,
      name: 'Tablets',
      items: 15,
      icon: Tablet,
      image:
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop&crop=center',
      gradient: 'from-cyan-500 via-cyan-600 to-blue-600',
      iconColor: 'text-cyan-100',
      shadowColor: 'shadow-cyan-500/40',
      glowColor: 'hover:shadow-cyan-500/60'
    }
  ];

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -250,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  return (
    <div className="w-full bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 relative overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-12 lg:mb-16 relative z-10">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-lg px-6 py-3 rounded-2xl border border-gray-200/50 shadow-lg mb-6">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Featured Collections
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-4 leading-tight">
          Premium Categories
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          Explore cutting-edge electronic accessories and innovative gadgets
        </p>

        <div className="flex justify-center items-center gap-4 mt-6">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>

      {/* Container */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl  backdrop-blur-xl shadow-2xl border border-gray-200/50 flex items-center justify-center transition-all duration-500 group ${
            canScrollLeft
              ? 'hover:bg-white hover:shadow-3xl hover:scale-110 text-gray-700 hover:text-purple-600 hover:border-purple-200/50'
              : 'text-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft size={26} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl  backdrop-blur-xl shadow-2xl border border-gray-200/50 flex items-center justify-center transition-all duration-500 group ${
            canScrollRight
              ? 'hover:bg-white hover:shadow-3xl hover:scale-110 text-gray-700 hover:text-purple-600 hover:border-purple-200/50'
              : 'text-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronRight size={26} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Scrollable Categories */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto px-6 sm:px-10 lg:px-16 py-8 scroll-smooth scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="flex-shrink-0 group cursor-pointer transform hover:scale-105 transition-all duration-500"
                style={{ minWidth: '180px' }}
              >
                <div className="text-center relative">
                  <div
                    className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-5 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${category.shadowColor} ${category.glowColor} shadow-2xl overflow-hidden border-2 border-white/20 backdrop-blur-sm`}
                  >
                    {category.featured && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse border-2 border-white">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-2xl transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                      <Icon className={`w-5 h-5 ${category.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="font-black text-gray-900 text-base sm:text-lg lg:text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-500 leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-semibold bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50 inline-block mt-2">
                    <Countup>{category.items}</Countup> Products
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Featured;
