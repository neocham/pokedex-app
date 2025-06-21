import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse" role="status" aria-label="Loading Pokemon card">
      <div className="p-4 flex flex-col items-center">
        {/* Image skeleton */}
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-2"></div>
        
        {/* Name skeleton */}
        <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
        
        {/* ID skeleton */}
        <div className="h-4 bg-gray-200 rounded w-16 mb-3"></div>
        
        {/* Type badges skeleton */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
        </div>
      </div>
    </div>
  );
};
