import {
  ChevronDown,
  Heart,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Menu,
  Package,
  Phone,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { clearCart } from "../../redux/app/features/cart/cartSlice";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "../../redux/app/services/auth/authApi";
import CartSlider from "./CartSlider";
import Logo from "./Logo";
import SubHeader from "./SubHeader";
import SearchBar from "../SearchBar";

export default function Navbar() {
  const { data: userInfo } = useUserInfoQuery();
  const user = userInfo?.data;
  const cartCount = useSelector((state) => state.cart.items.length);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isPictureLoaded, setIsPictureLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle user picture loading
  useEffect(() => {
    if (!user?.picture) return;
    const img = new Image();
    img.src = user.picture;
    img.onload = () => setIsPictureLoaded(true);
    img.onerror = () => setIsPictureLoaded(false);
  }, [user?.picture]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setIsUserDropdownOpen(false);
      }
      if (
        !e.target.closest(".mobile-menu-container") &&
        !e.target.closest(".mobile-menu-trigger")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    dispatch(clearCart());
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    toast.success("Logged out successfully", { position: "bottom-right" });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
            : "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100"
        }`}
      >
        <SubHeader />

        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Mobile menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                className="lg:hidden mobile-menu-trigger p-3 hover:bg-white/50 rounded-2xl transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo w="150px" />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar - Desktop */}
              <div className="hidden lg:block relative">
                <SearchBar />
              </div>

              {/* Action Icons */}
              <div className="flex items-center space-x-4">
                {/* Shopping Cart */}
                <button
                  className="p-3 hover:bg-white/50 rounded-2xl transition-all duration-200 group relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  {/* Cart Slider */}
                  <CartSlider
                    isOpen={isCartOpen}
                    toggleCart={() => setIsCartOpen(!isCartOpen)}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* User Dropdown - Desktop Only */}
                <div className="relative dropdown-container hidden lg:block">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded-2xl transition-all duration-200 group"
                  >
                    <div className="relative">
                      {isPictureLoaded ? (
                        <img
                          src={user?.picture}
                          alt={user?.name || "User"}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-blue-200 transition-colors"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-white shadow-sm">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 py-3 z-50">
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              {isPictureLoaded ? (
                                <img
                                  src={user.picture}
                                  alt={user.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                  <User className="w-6 h-6 text-blue-600" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {user?.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1 py-2">
                            <Link
                              to={
                                user?.role === "ADMIN"
                                  ? "/dashboard/admin"
                                  : "/dashboard/user"
                              }
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-2"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              Dashboard
                            </Link>
                            <Link
                              to={
                                user?.role === "ADMIN"
                                  ? "/dashboard/admin/profile"
                                  : "/dashboard/user/profile"
                              }
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mx-2"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              My Profile
                            </Link>
                            <hr className="border-gray-100 my-2" />
                            <button
                              className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 font-semibold"
                              onClick={handleLogout}
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="px-4 py-4 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-800">
                              Welcome to BuyHive
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Sign in to access your account
                            </p>
                          </div>
                          <div className="space-y-2 p-2">
                            <Link
                              to="/login"
                              className="block w-full text-center bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-space-cadet transition-colors duration-200"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/register"
                              className="block w-full text-center border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-space-cadet  text-sm font-semibold hover:text-white transition-colors duration-200"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              Create Account
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search BuyHive..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={closeMobileMenu}
        />

        {/* Slide Menu */}
        <div
          className={`mobile-menu-container relative bg-gradient-to-b from-white to-blue-50 h-full w-80 max-w-[85vw] shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Logo w="150px" />
              <span className="text-lg font-bold text-gray-800">BuyHive</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-white/50 rounded-xl transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {/* User Section */}
            {user ? (
              <div className="p-6 bg-white/50 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  {isPictureLoaded ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-blue-200">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate text-lg">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-r from-secondary to-primary text-white">
                <p className="font-semibold text-lg mb-2">Welcome to BuyHive</p>
                <p className="text-blue-100 text-sm mb-4">
                  Sign in to get personalized experience
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="flex-1 bg-white text-blue-600 text-center py-3 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 border border-white text-white text-center py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="p-4 space-y-2">
              {user && (
                <>
                  <Link
                    to={
                      user.role === "ADMIN"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 text-gray-700 font-semibold border border-transparent hover:border-blue-200"
                    onClick={closeMobileMenu}
                  >
                    <Home className="w-5 h-5 text-secondary" />
                    {user.role === "ADMIN" ? "Admin Dashboard" : "Dashboard"}
                  </Link>

                            <Link
                              to={
                                user?.role === "ADMIN"
                                  ? "/dashboard/admin/profile"
                                  : "/dashboard/user/profile"
                              }
                              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 text-gray-700 font-semibold border border-transparent hover:border-blue-200"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              <User className="w-5 h-5 text-secondary" />
                              My Profile
                            </Link>
                </>
              )}

              {/* Quick Links */}
              <div className="pt-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 px-4">
                  Explore
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/products"
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 text-gray-600 border border-transparent hover:border-gray-200"
                    onClick={closeMobileMenu}
                  >
                    <Package className="w-5 h-5 text-gray-400" />
                    All Products
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 text-gray-600 border border-transparent hover:border-gray-200"
                    onClick={closeMobileMenu}
                  >
                    <Info className="w-5 h-5 text-gray-400" />
                    About Us
                  </Link>
                  <Link
                    to="/faq"
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 text-gray-600 border border-transparent hover:border-gray-200"
                    onClick={closeMobileMenu}
                  >
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                    FAQ & Help
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 text-gray-600 border border-transparent hover:border-gray-200"
                    onClick={closeMobileMenu}
                  >
                    <Phone className="w-5 h-5 text-gray-400" />
                    Contact Support
                  </Link>
                </div>
              </div>

              {user && (
                <div className="pt-6 mt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-red-50 transition-all duration-200 text-red-600 font-semibold w-full text-left border border-transparent hover:border-red-200"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
