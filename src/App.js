import React from 'react';
import { PokemonProvider } from './features/pokemon/context/PokemonContext';
import { PokemonDashboard } from './features/pokemon/components/PokemonDashboard';
import { AppHeader } from './shared/components/AppHeader';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { PerformanceMonitor } from './shared/services/PerformanceMonitor';
import './index.css';

// Initialize performance monitoring
PerformanceMonitor.init();

export default function App() {
  React.useEffect(() => {
    PerformanceMonitor.mark('app-mount');
    PerformanceMonitor.measure('app-initialization', 'navigationStart', 'app-mount');
  }, []);

  return (
    <ErrorBoundary>
      <PokemonProvider>
        <div className="min-h-screen bg-gray-100">
          <AppHeader />
          <PokemonDashboard />
        </div>
      </PokemonProvider>
    </ErrorBoundary>
  );
}
