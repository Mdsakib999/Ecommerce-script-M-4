import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  MapPin,
  Package,
  Phone,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import { useLazyTrackOrderQuery } from "../redux/app/services/order/orderApi";

export default function TrackOrder() {
  const [trackingId, setTrackingId] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [trigger, { data: order, isFetching }] = useLazyTrackOrderQuery();

  const handleTrack = async () => {
    setNotFound(false);
    if (!trackingId.trim()) {
      toast.error(
        <p className="font-serif text-center">Please enter a tracking ID</p>
      );
      return;
    }
    try {
      const res = await trigger(trackingId).unwrap();
      if (!res || !res._id) {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  const getOrderSteps = (currentStatus) => {
    const status = currentStatus?.toUpperCase();

    if (status === "CANCELLED") {
      return [
        { name: "Pending", icon: Clock, completed: true, active: false },
        {
          name: "Cancelled",
          icon: XCircle,
          completed: true,
          active: true,
          cancelled: true,
        },
      ];
    }

    const steps = [
      { name: "Pending", icon: Clock, completed: false, active: false },
      { name: "Confirmed", icon: CheckCircle, completed: false, active: false },
      { name: "Shipped", icon: Truck, completed: false, active: false },
      { name: "Delivered", icon: Home, completed: false, active: false },
    ];

    const statusIndex = {
      PENDING: 0,
      CONFIRMED: 1,
      SHIPPED: 2,
      DELIVERED: 3,
    }[status];

    steps.forEach((step, index) => {
      if (index < statusIndex) {
        step.completed = true;
      } else if (index === statusIndex) {
        step.completed = true;
        step.active = true;
      }
    });

    return steps;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Enter your tracking ID to get real-time updates on your order status
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter your tracking ID..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg font-medium"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <Button
              onSmash={handleTrack}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none min-w-[140px]"
              disabled={isFetching}
            >
              {isFetching ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Tracking...
                </div>
              ) : (
                "Track Order"
              )}
            </Button>
          </div>
        </div>

        {/* Not Found State */}
        {notFound && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Order Not Found
            </h3>
            <p className="text-gray-600">
              Please check your tracking ID and try again
            </p>
          </div>
        )}

        {/* Order Status */}
        {order && order._id && !notFound && (
          <div className="space-y-8">
            {/* Progress Timeline */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Order{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Progress
                </span>
              </h2>

              <div className="relative">
                {/* Main Timeline */}
                <div className="flex flex-col md:flex-row items-center justify-between relative">
                  {getOrderSteps(order.status).map((step, index, arr) => {
                    const StepIcon = step.icon;
                    const isLast = index === arr.length - 1;

                    return (
                      <div
                        key={step.name}
                        className="flex-1 flex flex-col md:flex-row items-center mb-8 md:mb-0"
                      >
                        {/* Step Circle */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center border-4 shadow-lg transition-all duration-500 ${
                              step.cancelled
                                ? "bg-red-500 border-red-500 shadow-red-200"
                                : step.completed
                                ? "bg-gradient-to-r from-emerald-400 to-green-500 border-emerald-400 shadow-green-200"
                                : step.active
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 shadow-blue-200 animate-pulse"
                                : "bg-gray-200 border-gray-300"
                            }`}
                          >
                            <StepIcon
                              className={`w-6 h-6 ${
                                step.completed || step.active || step.cancelled
                                  ? "text-white"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>

                          {/* Step Label */}
                          <div
                            className={`mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
                              step.cancelled
                                ? "bg-red-100 text-red-700"
                                : step.completed
                                ? "bg-green-100 text-green-700"
                                : step.active
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {step.name}
                          </div>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                          <div
                            className={`hidden md:block flex-1 h-1 mx-4 rounded-full ${
                              step.completed
                                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Details
                </span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Customer Information
                  </h3>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold text-blue-600">
                        {order.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-sm text-gray-500">Customer</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.mobileNumber}
                      </p>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.streetAddress}
                      </p>
                      <p className="text-sm text-gray-500">{order.district}</p>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Order Information
                  </h3>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.paymentMethod}
                      </p>
                      <p className="text-sm text-gray-500">Payment Method</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-500">Order Date</p>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-center mt-4">
                    <p className="text-white/80 text-sm font-medium mb-1">
                      Total Amount
                    </p>
                    <p className="text-3xl font-bold text-white">
                      TK {order.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
