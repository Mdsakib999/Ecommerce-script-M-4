import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { addToCart } from "../../redux/app/features/cart/cartSlice";
import toast from "react-hot-toast";
export default function Product({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const existingItem = cartItems.find((item) => item._id === product._id);
  // existingItem?.cartQuantity is how many user added already
  const hasReachedStock =
    existingItem && existingItem.cartQuantity >= product.quantity;
  const isInCart = !!existingItem;
  const handleAddToCart = (product) => {
    if (hasReachedStock) {
      toast.error("Out of stock — you’ve added all available items");
      return;
    }

    dispatch(addToCart(product));
    console.log(product);
    if (!isInCart) {
      toast.success(<h1 className="text-center font-serif">Added to cart</h1>);
    } else {
      toast(<h3 className="text-center font-serif">Quantity increased</h3>, {
        icon: "🛒",
        position: "bottom-right",
      });
    }
  };
  console.log(product);
  return (
    <Link key={product?.id} to={`/product/${product?._id}`}>
      <div className="w-full mt-2 mx-auto max-w-96 bg-white backdrop-blur-sm rounded-3xl overflow-hidden relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-gray-200 hover:border-indigo-600">
        {/* Sale Badge */}
        {product?.discountPrice && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-2xl border-2 border-white">
            SALE
          </div>
        )}

        {/* Product Image Container */}
        <div className="relative p-4 pb-2">
          <div className="relative w-full h-full mb-2">
            {/* Image Container */}
            <div className="relative w-full h-72 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-inner border border-gray-200/30">
              <img
                src={product?.images[0]}
                alt={product?.name}
                className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 pt-2">
          <div className="pl-2 space-y-2">
            {/* Category */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-100/50 rounded-full px-3 py-1 inline-block">
              {product?.category}
            </p>

            {/* Product Name */}
            <h2 className="text-lg font-bold text-gray-900 min-h-12 leading-tight line-clamp-2">
              {product?.name.slice(0, 25)}
            </h2>

            {/* Price Section */}
            <div className="flex items-center space-x-2">
              {product?.discountPrice ? (
                <>
                  <p className="text-xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    ${product?.discountPrice}
                  </p>
                  <p className="text-md text-gray-400 line-through font-medium">
                    ${product?.price}
                  </p>
                </>
              ) : (
                <p className="text-xl font-black text-gray-900">
                  ${product?.price}
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.preventDefault(),
                    e.stopPropagation(),
                    handleAddToCart(product);
                }}
                disabled={hasReachedStock}
                className={`w-full cursor-pointer rounded-xl py-2 px-4 font-semibold text-sm flex items-center justify-center space-x-2 transition-colors ${
                  hasReachedStock
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isInCart
                    ? "bg-emerald-400 text-white hover:bg-emerald-500"
                    : "bg-gray-200 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <ShoppingCart
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>
                  {hasReachedStock
                    ? "Out of Stock"
                    : isInCart
                    ? "Added ✓"
                    : "Add to Cart"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
}
