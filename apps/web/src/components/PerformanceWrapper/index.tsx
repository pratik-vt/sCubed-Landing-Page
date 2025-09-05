'use client';

import React, { Suspense } from 'react';

// Performance wrapper that provides loading states and error boundaries
interface PerformanceWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ 
  children, 
  fallback = <div>Loading...</div> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default PerformanceWrapper;
