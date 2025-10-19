import { Link } from "react-router";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../ui/Button";

const Offer = () => {
  const offers = [
    {
      id: 1,
      title: "Save Tk 610 on Wireless Headphones",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760520894/products/apywvccaueekxdipycec.jpg",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      accentColor: "from-blue-400 to-blue-500",
      buttonStyle: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
      category: "Electronics",
      discount: "19% OFF",
    },
    {
      id: 2,
      title: "Save Tk 1000 on Smart Watches",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521070/products/vxsssdax4idhkk4ousre.avif",
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      accentColor: "from-green-400 to-green-500",
      buttonStyle:
        "bg-green-500 hover:bg-green-600 text-white border-green-500",
      category: "Electronics",
      discount: "20% OFF",
    },
    {
      id: 3,
      title: "Save Tk 350 on Power Banks",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521141/products/hw58zbbrgvzabfbd4oti.webp",
      bgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
      accentColor: "from-orange-400 to-orange-500",
      buttonStyle:
        "bg-orange-500 hover:bg-orange-600 text-white border-orange-500",
      category: "Accessories",
      discount: "19% OFF",
    },
    {
      id: 4,
      title: "Save Tk 400 on Bluetooth Speakers",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521208/products/zhw9ht9uyivzrabupvx4.jpg",
      bgColor: "bg-gradient-to-br from-red-100 to-red-200",
      accentColor: "from-red-400 to-red-500",
      buttonStyle: "bg-red-500 hover:bg-red-600 text-white border-red-500",
      category: "Electronics",
      discount: "21% OFF",
    },
    {
      id: 5,
      title: "Save Tk 3600 on Refrigerators",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521269/products/oddfwp1nph2c73hftjpf.jpg",
      bgColor: "bg-gradient-to-br from-teal-100 to-teal-200",
      accentColor: "from-teal-400 to-teal-500",
      buttonStyle: "bg-teal-500 hover:bg-teal-600 text-white border-teal-500",
      category: "Home Appliances",
      discount: "12% OFF",
    },
    {
      id: 6,
      title: "Save Tk 2500 on Smart TVs",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521245/products/je3uxv5xraeolzrwhdzs.jpg",
      bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      accentColor: "from-indigo-400 to-indigo-500",
      buttonStyle:
        "bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-500",
      category: "Home Entertainment",
      discount: "12% OFF",
    },
    {
      id: 7,
      title: "Save Tk 1800 on Microwave Ovens",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521291/products/p3xnf4hghgnbuvq2jms1.jpg",
      bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
      accentColor: "from-pink-400 to-pink-500",
      buttonStyle: "bg-pink-500 hover:bg-pink-600 text-white border-pink-500",
      category: "Kitchen Appliances",
      discount: "14% OFF",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent">
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
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-indigo-400",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="!pb-14"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id} className="group">
            {/* Card Container */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 group-hover:scale-105">
              {/* Image Container with Gradient */}
              <div
                className={`relative h-48 ${offer.bgColor} flex items-center justify-center p-6 overflow-hidden`}
              >
                {/* Product Image */}
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-32 h-32 object-cover rounded-2xl shadow-lg border-4 border-white/80"
                  />
                </div>

                {/* Discount Badge */}
                <div className="absolute z-10 top-4 left-4">
                  <div
                    className={`bg-gradient-to-r ${offer.accentColor}  text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}
                  >
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
                    w-full mt-auto  rounded-xl font-semibold 
                    transition-all duration-300 transform hover:scale-105 
                    shadow-md hover:shadow-lg border-0
                    ${offer.buttonStyle}
                  `}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Shop Now</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
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
