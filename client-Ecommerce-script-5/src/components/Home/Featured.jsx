import { Link } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';

const Featured = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521070/products/vxsssdax4idhkk4ousre.avif",
      count: 45,
    },
    {
      id: 2,
      name: "Accessories",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760520895/products/umubcdzvmzabpnk6orpn.jpg",
      count: 38,
    },
    {
      id: 3,
      name: "Home Appliances",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521316/products/gpp3oumjnmomf69iod41.jpg",
      count: 56,
    },
    {
      id: 4,
      name: "Home Entertainment",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521245/products/je3uxv5xraeolzrwhdzs.jpg",
      count: 33,
    },
    {
      id: 5,
      name: "Kitchen Appliances",
      image:
        "https://res.cloudinary.com/dpkjsufwx/image/upload/v1760521269/products/oddfwp1nph2c73hftjpf.jpg",
      count: 25,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 mb-6">
        <h2 className="text-2xl py-1 md:text-4xl bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent font-semibold">
          Popular Categories
        </h2>
        <Link to={"/products"}>
          <p className="underline text-ultra-violet cursor-pointer text-md md:text-lg font-semibold">
            View All Products
          </p>
        </Link>
      </div>

      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination,Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        autoplay
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        className="pb-12"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/products?category=${category.id}`}>
              <div className="group flex flex-col items-center cursor-pointer">
                {/* Category Card */}
                <div className="w-full aspect-square bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-600 flex flex-col items-center justify-center transition-all duration-500 ease-in-out hover:shadow-lg hover:bg-indigo-50 p-4">
                  {/* Image */}
                  <div className="h-32 min-h-24 transition-transform mb-4 duration-500 ease-in-out group-hover:scale-110">
                   <img className="h-full w-full  object-cover" src={category.image} alt="category image" />
                  </div>
                {/* Category Name */}
                <h3 className="text-center  font-bold text-gray-700 mt-3 text-sm sm:text-base transition-colors duration-300 group-hover:text-indigo-600">
                  {category.name}
                </h3>

                {/* Item Count */}
                <p className="text-center text-gray-500 text-xs sm:text-sm transition-colors duration-300 group-hover:text-indigo-600">
                  {category.count} Items
                </p>

                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="swiper-button-prev !w-10 !h-10 !bg-indigo-600 hover:!bg-indigo-700 !rounded-full !left-0 sm:!-left-14 transition-all duration-300 !after:text-white !after:text-sm"></div>
        <div className="swiper-button-next !w-10 !h-10 !bg-indigo-600 hover:!bg-indigo-700 !rounded-full !right-0 sm:!-right-14 transition-all duration-300 !after:text-white !after:text-sm"></div>

        {/* Pagination */}
        <div className="swiper-pagination !bottom-0 !static !mt-12 flex justify-center gap-2"></div>
      </Swiper>
    </div>
  );
};

export default Featured;