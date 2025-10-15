import { Clock, Flame, TrendingUp, Zap } from "lucide-react";
import { useMemo } from "react";
import Product from "../../pages/Products/Product";
import { useGetAllProductQuery } from "../../redux/app/services/product/productApi";
import Loader from "../../utils/Loader";
import Button from "../ui/Button";
import OfferTimer from "./OfferTimer";

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
            <h2 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
              Flash Deals
            </h2>
            <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Limited time offers
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-red-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-2xl">
          <Flame className="w-5 h-5 animate-pulse" />
          <span className="font-bold text-sm uppercase tracking-wider">
            Hot Deals
          </span>
          <TrendingUp className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Timer + Products */}
      <div className="relative bg-gradient-to-br from-white via-red-50 to-purple-50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-red-200/30 backdrop-blur-sm overflow-hidden">
        {/* Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-yellow-500/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:space-x-8 space-y-8 lg:space-y-0">
          {/* Timer Section */}
          <div className="w-full mt-12 lg:w-1/4 flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl hover:scale-110 transition-transform duration-300">
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
                <Button className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                  View All Offers
                </Button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-purple-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-gray-800">
                Featured Products
              </h3>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products?.map((product) => (
                <div
                  key={product?._id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
