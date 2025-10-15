import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import Button from "../ui/Button";

const Offer = () => {
  const offers = [
    {
      id: 1,
      title: "Save up to $40 on select cellphone & tablet",
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
      accentColor: "from-yellow-400 to-yellow-500",
      buttonStyle: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500",
    },
    {
      id: 2,
      title: "Save up to 25% on furniture items",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      accentColor: "from-blue-400 to-blue-500",
      buttonStyle: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
    },
    {
      id: 3,
      title: "Save up to $69 on select perfume items",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
      accentColor: "from-pink-400 to-pink-500",
      buttonStyle: "bg-pink-500 hover:bg-pink-600 text-white border-pink-500",
    },
    {
      id: 4,
      title: "Save up to 30% on audio items",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      accentColor: "from-green-400 to-green-500",
      buttonStyle: "bg-green-500 hover:bg-green-600 text-white border-green-500",
    },
    {
      id: 5,
      title: "Save up to 30% on audio items",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      accentColor: "from-green-400 to-green-500",
      buttonStyle: "bg-green-500 hover:bg-green-600 text-white border-green-500",
    },
    {
      id: 6,
      title: "Save up to 30% on audio items",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      accentColor: "from-green-400 to-green-500",
      buttonStyle: "bg-green-500 hover:bg-green-600 text-white border-green-500",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
            Hot Deals & Offers
          </h2>
        </div>
        <Link to={"/products"}>
          <p className="underline cursor-pointer text-md md:text-lg text-ultra-violet font-semibold">
            View All Products
          </p>
        </Link>
      </div>

      {/* Offers Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        pagination={{ 
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-gradient-to-r from-purple-500 to-pink-500"
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="!pb-14"
      >
        {offers.map((offer) => (
          <SwiperSlide
            key={offer.id}
            className="group"
          >
            {/* Card Container */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 group-hover:scale-105">
              {/* Image Container with Gradient */}
              <div className={`relative h-48 ${offer.bgColor} flex items-center justify-center p-6 overflow-hidden`}>
                
                {/* Product Image */}
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-32 h-32 object-cover rounded-2xl shadow-lg border-4 border-white/80"
                  />
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`bg-gradient-to-r ${offer.accentColor} text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}>
                    SAVE UP TO
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 min-h-[4rem] leading-tight flex-1">
                  {offer.title}
                </h3>

                {/* Shop Now Button */}
                <Button 
                  to="/products"
                  className={`
                    w-full mt-auto py-3 px-6 rounded-xl font-semibold 
                    transition-all duration-300 transform hover:scale-105 
                    shadow-md hover:shadow-lg border-0
                    ${offer.buttonStyle}
                  `}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Shop Now</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Offer;