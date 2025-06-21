import { useState, useEffect, useCallback, useRef } from 'react';

export const useStaleWhileRevalidate = (key, fetcher, options = {}) => {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval = 0,
    dedupingInterval = 2000,
    errorRetryCount = 3,
    errorRetryInterval = 5000,
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevalidating, setIsRevalidating] = useState(false);
  
  const cacheRef = useRef(new Map());
  const retryCountRef = useRef(0);
  const lastFetchTimeRef = useRef(0);

  const executeRequest = useCallback(async (isRevalidation = false) => {
    const now = Date.now();
    
    // Deduping: prevent multiple requests within the deduping interval
    if (now - lastFetchTimeRef.current < dedupingInterval && !isRevalidation) {
      return;
    }
    
    lastFetchTimeRef.current = now;
    
    try {
      if (!isRevalidation) {
        setIsLoading(true);
      } else {
        setIsRevalidating(true);
      }
      
      setError(null);
      
      const result = await fetcher(key);
      
      // Cache the result
      cacheRef.current.set(key, {
        data: result,
        timestamp: now,
      });
      
      setData(result);
      retryCountRef.current = 0; // Reset retry count on success
      
    } catch (err) {
      console.error(`SWR Error for key "${key}":`, err);
      setError(err);
      
      // Implement exponential backoff for retries
      if (retryCountRef.current < errorRetryCount) {
        retryCountRef.current++;
        const backoffDelay = errorRetryInterval * Math.pow(2, retryCountRef.current - 1);
        
        setTimeout(() => {
          executeRequest(isRevalidation);
        }, backoffDelay);
      }
    } finally {
      setIsLoading(false);
      setIsRevalidating(false);
    }
  }, [key, fetcher, dedupingInterval, errorRetryCount, errorRetryInterval]);

  // Initial load with cache check
  useEffect(() => {
    const cached = cacheRef.current.get(key);
    
    if (cached) {
      // Use stale data immediately
      setData(cached.data);
      setIsLoading(false);
      
      // Revalidate in background
      executeRequest(true);
    } else {
      executeRequest();
    }
  }, [key, executeRequest]);

  // Revalidate on window focus
  useEffect(() => {
    if (!revalidateOnFocus) return;

    const handleFocus = () => {
      if (data) executeRequest(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [revalidateOnFocus, data, executeRequest]);

  // Revalidate on network reconnect
  useEffect(() => {
    if (!revalidateOnReconnect) return;

    const handleOnline = () => {
      if (data) executeRequest(true);
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [revalidateOnReconnect, data, executeRequest]);

  // Auto refresh interval
  useEffect(() => {
    if (!refreshInterval || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      if (data) executeRequest(true);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, data, executeRequest]);

  const mutate = useCallback((newData) => {
    if (typeof newData === 'function') {
      setData(prevData => {
        const updated = newData(prevData);
        cacheRef.current.set(key, { data: updated, timestamp: Date.now() });
        return updated;
      });
    } else {
      setData(newData);
      cacheRef.current.set(key, { data: newData, timestamp: Date.now() });
    }
  }, [key]);

  return {
    data,
    error,
    isLoading,
    isRevalidating,
    mutate,
    revalidate: () => executeRequest(true),
  };
};
