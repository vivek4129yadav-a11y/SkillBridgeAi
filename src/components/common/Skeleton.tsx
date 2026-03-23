import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  let variantClass = '';

  switch (variant) {
    case 'circular':
      variantClass = 'rounded-full';
      break;
    case 'text':
      variantClass = 'rounded h-4 w-full';
      break;
    case 'rectangular':
    default:
      variantClass = 'rounded-md';
      break;
  }

  return <div className={`${baseClass} ${variantClass} ${className}`} />;
};
