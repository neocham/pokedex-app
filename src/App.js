import React from 'react';
import { PokemonProvider } from './features/pokemon/context/PokemonContext';
import { PokemonDashboard } from './features/pokemon/components/PokemonDashboard';
import { AppHeader } from './shared/components/AppHeader';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import './index.css';

export default function App() {
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