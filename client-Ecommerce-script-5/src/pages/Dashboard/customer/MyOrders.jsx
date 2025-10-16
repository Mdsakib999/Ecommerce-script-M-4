import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Filter,
  MapPin,
  Package,
  Search,
  Sparkles,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useUserInfoQuery } from "../../../redux/app/services/auth/authApi";
import { useGetMyOrdersQuery } from "../../../redux/app/services/order/orderApi";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: userInfo } = useUserInfoQuery();
  const { data: orders = [], isLoading } = useGetMyOrdersQuery(
    userInfo?.data?._id
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle size={20} className="text-green-600" />;
      case "SHIPPED":
        return <Truck size={20} className="text-blue-600" />;
      case "CONFIRMED":
        return <Package size={20} className="text-emerald-600" />;
      case "PENDING":
        return <Clock size={20} className="text-orange-600" />;
      case "CANCELLED":
        return <AlertCircle size={20} className="text-red-600" />;
      default:
        return <Clock size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-50 border-green-200 text-green-700";
      case "SHIPPED":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "CONFIRMED":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "PENDING":
        return "bg-orange-50 border-orange-200 text-orange-700";
      case "CANCELLED":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orders?.some((item) =>
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusList = [
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "SHIPPED",
    "DELIVERED",
  ];

  return (
    <div className="w-full p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200/50 shadow-lg mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Order History
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
            My Orders
          </h1>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statusList.map((status) => (
            <div
              key={status}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                {orders.filter((o) => o.status === status).length}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                {getStatusIcon(status)}
                <div className="text-sm font-semibold text-gray-600">
                  {status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="text"
                placeholder="Search by product name or order ID..."
                className="relative w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 z-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full lg:w-64">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                className="relative w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 appearance-none z-10"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {statusList.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-12 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-16 h-16 text-blue-500 animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Loading Your Orders
              </h3>
              <p className="text-gray-600 font-medium">
                Please wait while we fetch your order history...
              </p>
            </div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden hover:shadow-3xl transition-all duration-500"
              >
                {/* Order Header */}
                <div className="p-6 lg:p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900">
                            #{order.transactionId}
                          </h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CreditCard className="w-4 h-4" />
                              {order.paymentMethod}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {order.district}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 lg:p-8 space-y-4">
                  {order.orders.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-200/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-white rounded-2xl border-2 border-white shadow-lg overflow-hidden">
                          {item.product.images?.[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400 m-auto" />
                          )}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {item.product.name}
                        </h4>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-semibold">৳{item.price}</span> ×{" "}
                          {item.quantity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.product.brand} • {item.product.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Item Total</div>
                        <div className="text-xl">৳{item.totalPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 border-t border-gray-200/50 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600 font-medium">
                      Order Total
                    </div>
                    <div className="text-2xl lg:text-3xl font-semibold">
                      ৳{order.total}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-16 text-center">
            <div className="flex flex-col items-center">
              <Package className="w-20 h-20 text-gray-300 mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                No Orders Found
              </h3>
              <p className="text-gray-600 text-lg font-medium mb-6">
                Try adjusting your search terms or status filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
