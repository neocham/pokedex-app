import { useState, useEffect, useMemo } from 'react';

export const useVirtualization = ({ 
  items, 
  itemHeight, 
  containerHeight, 
  overscan = 5 
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const { startIndex, endIndex, visibleItems, totalHeight } = useMemo(() => {
    const itemCount = items.length;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + visibleCount + overscan, itemCount - 1);
    
    const actualStart = Math.max(0, start - overscan);
    const actualEnd = Math.min(itemCount - 1, end);
    
    const visible = items.slice(actualStart, actualEnd + 1);
    const total = itemCount * itemHeight;

    return {
      startIndex: actualStart,
      endIndex: actualEnd,
      visibleItems: visible,
      totalHeight: total,
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);

  return {
    startIndex,
    endIndex,
    visibleItems,
    totalHeight,
    setScrollTop,
  };
};
