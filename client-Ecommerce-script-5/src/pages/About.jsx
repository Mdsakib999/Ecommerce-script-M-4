import banner from "../assets/about-banner.jpg";
import AboutSection from "../components/shared/AboutSection";
import Countup from "../components/shared/Countup";

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero Banner Section */}
      <div className="relative mb-16 min-h-[70vh] bg-no-repeat bg-cover bg-center flex items-center justify-center text-white">
        {/* Background Image with Multiple Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="z-10 flex items-center flex-col gap-6 text-center px-4 max-w-4xl">
          {/* Preheading with animated underline */}
          <div className="relative">
            <p className="tracking-widest text-lg font-light text-gray-200 uppercase mb-2">
              WE CAN DO MORE FOR YOU
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white capitalize leading-tight">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              BuyHive
            </span>
          </h1>

          {/* Decorative Elements */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="relative px-4 max-w-4xl mx-auto text-center mb-20">
        {/* Background Decoration */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-60"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-indigo-100 rounded-full blur-xl opacity-60"></div>

        <div className="relative z-10">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-sm">
            At BuyHive, we are committed to making online shopping simple,
            enjoyable, and trustworthy. Our mission is to deliver high-quality
            products directly to your doorstep while providing exceptional
            customer service. Every item is carefully selected for quality,
            value, and style. We aim to build a community where customers feel
            supported, valued, and inspired. Your satisfaction drives everything
            we do, making every interaction seamless and memorable.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and customer
            satisfaction
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: 800,
              label: "Product Types",
              color: "from-blue-500 to-cyan-500",
            },
            {
              number: 12,
              label: "Years Of Experience",
              color: "from-indigo-500 to-pink-500",
            },
            {
              number: 2500,
              label: "Trust Customers",
              color: "from-green-500 to-emerald-500",
            },
            {
              number: 15,
              label: "Stores Nationwide",
              color: "from-orange-500 to-red-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ padding: "2px" }}
              >
                <div className="w-full h-full bg-white rounded-2xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Number with Gradient */}
                <div
                  className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Countup>{stat.number}</Countup>+
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>

              {/* Decorative Element */}
              <div
                className={`absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <AboutSection
        preheading="OUR HISTORY"
        heading="Creative and renovate fashion trends"
        normaltext="Collaboratively administrate empowered markets via plug-and-play maintain networks. Dynamically usable procrastinate B2B users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
        image="https://i.ibb.co.com/trJvsqh/pexels-karolina-grabowska-5650016.jpg"
        reverse={false}
      />
      <AboutSection
        preheading="Our vision"
        heading="We are marketpress"
        normaltext="Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI."
        image="https://i.ibb.co.com/tMBVZ117/pexels-karolina-grabowska-5632398.jpg"
        reverse={true}
      />
    </div>
  );
}
