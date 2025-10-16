import {
  AlertCircle,
  Check,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Shield,
  ShoppingCart,
  Sparkles,
  Truck,
  User,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../redux/app/features/cart/cartSlice";
import { useUserInfoQuery } from "../redux/app/services/auth/authApi";
import { useCreateOrderMutation } from "../redux/app/services/order/orderApi";

export default function Checkout() {
  const { data: userInfo } = useUserInfoQuery();

  const orderItems = useSelector((state) => state.cart.items);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  );
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo?.data?.name || "",
      email: userInfo?.data?.email || "",
      district: "Dhaka",
      streetAddress: userInfo?.data?.address || "",
      mobileNumber: userInfo?.data?.phone || "",
      paymentMethod: "COD",
    },
  });

  const districts = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
  ];

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const orders = orderItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
      price: item.discountPrice,
      totalPrice: item.discountPrice * item.quantity,
    }));

    const total = orders.reduce((sum, item) => sum + item.totalPrice, 0);

    const finalOrder = { ...data, orders, user: userInfo?.data?._id, total };

    try {
      const result = await createOrder(finalOrder).unwrap();
      if (result.success) {
        dispatch(clearCart());
        toast.success(
          <h1 className="font-serif text-center">
            Order placed successfully!
          </h1>,
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
        navigate("/order-success", { state: { order: result.data } });
      }
    } catch {
      toast.error(
        <h1 className="font-serif text-center">
          Failed to place order! Please try again
        </h1>,
        {
          position: "bottom-right",
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 sm:py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200/50 shadow-lg mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Secure Checkout
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-clip-text text-transparent mb-4 leading-tight">
            Complete Your Order
          </h1>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            Review your items and enter your shipping details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Billing Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Billing Details
                    </h2>
                    <p className="text-gray-600 font-medium">
                      Enter your shipping information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      readOnly
                      className={`w-full px-4 py-4 border-2 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm ${
                        errors.name
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                      <Mail className="w-4 h-4 text-green-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      readOnly
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`w-full px-4 py-4 border-2 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm ${
                        errors.email
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      District <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="district"
                      control={control}
                      rules={{ required: "District is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full px-4 py-4 border-2 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white backdrop-blur-sm ${
                            errors.district
                              ? "border-red-300 bg-red-50/50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {districts.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.district && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                      <Phone className="w-4 h-4 text-indigo-500" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("mobileNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^(\+880|880|01)[1-9]\d{8}$/,
                          message:
                            "Please enter a valid Bangladesh mobile number",
                        },
                      })}
                      className={`w-full px-4 py-4 border-2 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white backdrop-blur-sm ${
                        errors.mobileNumber
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.mobileNumber && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("streetAddress", {
                        required: "Address is required",
                      })}
                      rows={4}
                      className={`w-full px-4 py-4 border-2 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white backdrop-blur-sm resize-none ${
                        errors.streetAddress
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="House/Flat number, Road name, Area"
                    />
                    {errors.streetAddress && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-12 pt-8 border-t border-gray-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">
                        Payment Method
                      </h3>
                      <p className="text-gray-600 font-medium">
                        Choose how you want to pay
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-all duration-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="COD"
                        {...register("paymentMethod")}
                        className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        defaultChecked
                      />
                      <div className="ml-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Truck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <span className="text-base font-bold text-gray-900">
                            Cash on Delivery
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 lg:sticky lg:top-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200/50">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Order Summary
                    </h2>
                    <p className="text-gray-600 font-medium">
                      {orderItems.length} items in cart
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {orderItems.length === 0 ? (
                    <div className="py-12 text-center">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">
                        No items in your cart
                      </p>
                    </div>
                  ) : (
                    orderItems.map((item) => {
                      const itemTotal =
                        (item.discountPrice ?? item.price) * item.quantity;
                      return (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="relative">
                            <img
                              src={item.images?.[0]}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-sm"
                            />
                            <span className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">
                              {item.brand} • {item.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-bold text-gray-900">
                                ৳{itemTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {orderItems.length > 0 && (
                  <>
                    {/* Order Total */}
                    <div className="space-y-4 border-t border-gray-200/50 pt-6">
                      <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600 font-medium">
                          Subtotal
                        </span>
                        <span className="font-bold text-gray-900">
                          ৳{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600 font-medium">
                          Shipping
                        </span>
                        <span className="font-bold text-green-600 flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Free
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200/50 pt-4 mt-4">
                      <div className="flex justify-between items-center text-xl font-black">
                        <span className="text-gray-900">Total Amount</span>
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          ৳{total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 mt-6">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-green-800">
                          Secure Checkout
                        </p>
                        <p className="text-xs text-green-600">
                          Your information is protected
                        </p>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        orderItems.length === 0 ||
                        userInfo?.data?.role === "ADMIN"
                      }
                      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl text-base transition-all duration-300 hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5 text-white" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Place Order • ৳{total.toLocaleString()}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-2">
                      <Shield className="w-3 h-3" />
                      Secure SSL encrypted payment
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
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
