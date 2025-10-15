// components/common/ProductCardSkeleton.jsx
import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        
        {/* Price */}
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        
        {/* Button */}
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;