import { Clock, Flame, TrendingUp, Zap, ArrowRight, ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import Product from "../../pages/Products/Product";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import Loader from "../../utils/Loader";
import Button from "../ui/Button";
import OfferTimer from "./OfferTimer";
import {Autoplay, Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
export default function OfferedProducts() {
  const targetDate = new Date("January 25, 2026 00:00:00").getTime();

  const params = useMemo(() => ({ limit: 3 }), []);
  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductQuery(params);
  const products = productsData?.data || [];
  console.log(products);

  if (isProductLoading) return <Loader />;

  return (
    <div className="max-w-7xl px-6 w-full mx-auto py-16 lg:py-24">
      {/* Section header */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 mb-12 lg:mb-16">
        <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-xl rounded-2xl p-4 lg:p-6 border border-gray-200/50 shadow-2xl">
          <div className="relative">
            <img
              className="w-16 lg:w-20 filter drop-shadow-lg"
              src="https://i.ibb.co.com/ymWS3hLw/megaphone-loudspeaker-making-announcement-vector.jpg"
              alt="offer"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Flash Deals
            </h2>
            <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Limited time offers
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 rounded-2xl shadow-2xl">
          <Flame className="w-5 h-5 animate-pulse" />
          <span className="font-bold text-sm uppercase tracking-wider">
            Hot Deals
          </span>
          <TrendingUp className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Timer + Products */}
      <div className="relative  rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl border border-indigo-200/30 overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:space-x-8 space-y-8 lg:space-y-0">
          {/* Timer Section */}
          <div className="w-full lg:w-1/4 flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 hover:scale-110 transition-transform duration-300">
            <div className="text-center space-y-6">
              {/* Timer Header */}
              <div className="space-y-2">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Clock className="w-6 h-6 text-red-500 animate-pulse" />
                  <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                    Offer Ends In
                  </h1>
                  <OfferTimer targetDate={targetDate} />
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  Hurry up! Limited time offer
                </p>
              </div>
              {/* CTA Button */}
              <div className="pt-4">
                <Button className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 border-2 border-white/20">
                  View All Offers
                </Button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full relative group lg:w-3/4">
            {/* Products Grid */}
                  <Swiper className=""
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView= {2}
        spaceBetween = {50}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl:".button-prev-slide",
        }}
        modules={[Navigation,Autoplay]}
                autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
              {products?.map((product) => (
                <SwiperSlide
                  key={product?._id}
                  className="transform pb-4 transition-transform duration-300"
                >
                  <Product product={product} />
                </SwiperSlide>
              ))}
              <div className="button-prev-slide absolute z-10 -right-20  group-hover:right-0 top-[50%]  duration-500 text-white w-[40px] h-[40px] bg-gray-700 grid place-items-center">
                <ArrowRight />
              </div>
              <div className="button-next-slide absolute -left-20 group-hover:left-0 z-10  top-[50%] duration-500 text-white w-[40px] h-[40px] bg-gray-700 grid place-items-center">
               <ArrowLeft />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
