import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/footerLogo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content - All in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-8 lg:gap-6">
            {/* Logo & Description */}
            <div className="space-y-4 lg:col-span-2">
              <Link
                to="/"
                className="inline-block transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  className="w-52 filter brightness-0 invert"
                  src={logo}
                  alt="BuyHive logo"
                />
              </Link>

              <div className="space-y-3">
                <p className="text-xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  BuyHive Industries Ltd.
                </p>
                <p className="text-gray-300 w-60 leading-relaxed text-sm">
                  Providing reliable tech and premium shopping experiences since
                  1992. Your trusted partner in quality and innovation.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>123 Commerce Street, Business District</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h6 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                Services
              </h6>
              <ul className="space-y-3 ">
                {["Branding", "Design", "Marketing", "Advertisement"].map(
                  (item) => (
                    <li className="" key={item}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white group flex items-center justify-between gap-2 transition-all duration-300 hover:translate-x-2 text-sm"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h6 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                Company
              </h6>
              <ul className="space-y-3">
                {["About us", "Contact", "Jobs", "Press kit"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white group flex items-center gap-2 transition-all duration-300 hover:translate-x-2 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h6 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                Legal
              </h6>
              <ul className="space-y-3">
                {[
                  "Terms of use",
                  "Privacy policy",
                  "Cookie policy",
                  "Marketing policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white group flex items-center gap-2 transition-all duration-300 hover:translate-x-2 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-4 col-span-1 lg:col-span-3">
              <h6 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stay Updated ✨
              </h6>
              <p className="text-gray-300 text-sm">
                Subscribe for exclusive deals and updates
              </p>

              <form className="space-y-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative flex items-center bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 group-hover:border-blue-400/30 transition-all duration-300 overflow-hidden">
                    <Mail className="absolute left-3 w-4 h-4 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Your email"
                      className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-400 pl-10 pr-4 py-3 text-sm focus:ring-0 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-3 font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>

              {/* Social Media */}
              <div className="pt-2">
                <p className="text-gray-300 text-sm mb-3 font-medium">
                  Follow Us
                </p>
                <div className="flex space-x-2">
                  {[
                    {
                      Icon: Facebook,
                      color: "hover:bg-blue-500 hover:border-blue-500",
                      label: "Facebook",
                    },
                    {
                      Icon: Youtube,
                      color: "hover:bg-red-500 hover:border-red-500",
                      label: "YouTube",
                    },
                    {
                      Icon: Twitter,
                      color: "hover:bg-blue-400 hover:border-blue-400",
                      label: "Twitter",
                    },
                    {
                      Icon: Instagram,
                      color:
                        "hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:border-transparent",
                      label: "Instagram",
                    },
                  ].map(({ Icon, color, label }) => (
                    <a
                      key={label}
                      href="#"
                      className={`border-2 border-gray-600 bg-gray-700/30 text-gray-300 ${color} hover:text-white  rounded-xl p-2 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm`}
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 border border-gray-700/30 mt-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-xs text-gray-300 font-medium">
                  100% Secure
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-12">
            <div className="border-t border-gray-700/50 pt-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
                <p className="text-gray-400 text-sm text-center lg:text-left">
                  © 2025{" "}
                  <span className="text-white font-semibold">
                    BuyHive Industries Ltd.
                  </span>{" "}
                  • Demo Store • All Rights Reserved
                </p>

                <div className="flex items-center gap-4 text-gray-400 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    SSL Secured
                  </span>
                  <span>•</span>
                  <span>Trusted Since 1992</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
