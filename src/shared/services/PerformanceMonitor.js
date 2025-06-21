export class PerformanceMonitor {
  static isEnabled = typeof performance !== 'undefined' && performance.mark;

  static init() {
    if (!this.isEnabled) return;
    
    // Monitor Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
  }

  static mark(name) {
    if (!this.isEnabled) return;
    performance.mark(name);
  }

  static measure(name, startMark, endMark = null) {
    if (!this.isEnabled) return;
    
    try {
      if (endMark) {
        performance.measure(name, startMark, endMark);
      } else {
        performance.measure(name, startMark);
      }
      
      const measure = performance.getEntriesByName(name)[0];
      console.debug(`📊 ${name}: ${measure.duration.toFixed(2)}ms`);
      
      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        this.sendMetric(name, measure.duration);
      }
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  }

  static observeLCP() {
    if (!this.isEnabled) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.debug(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observation failed:', error);
    }
  }

  static observeFID() {
    if (!this.isEnabled) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.debug(`📊 FID: ${entry.processingStart - entry.startTime}ms`);
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID observation failed:', error);
    }
  }

  static observeCLS() {
    if (!this.isEnabled) return;
    
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.debug(`📊 CLS: ${clsValue}`);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observation failed:', error);
    }
  }

  static sendMetric(name, value) {
    // Implementation for sending metrics to analytics service
    // This would integrate with your monitoring solution (DataDog, New Relic, etc.)
    console.log(`Metric: ${name} = ${value}ms`);
  }
}
