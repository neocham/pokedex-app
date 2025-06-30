import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './features/pokemon/context/PokemonContext';
import { FavoritesProvider } from './features/favorites/context/FavoritesContext';
import { TeamBuilderProvider } from './features/teams/context/TeamBuilderContext';
import { ThemeProvider } from './shared/context/ThemeContext';
import { NotificationProvider } from './shared/context/NotificationContext';
import { Layout } from './shared/components/Layout';
import { PokemonDashboard } from './features/pokemon/components/PokemonDashboard';
import { PokemonDetail } from './features/pokemon/components/PokemonDetail';
import { FavoritesList } from './features/favorites/components/FavoritesList';
import { TeamBuilder } from './features/teams/components/TeamBuilder';
import { BattleSimulator } from './features/battle/components/BattleSimulator';
import { Statistics } from './features/stats/components/Statistics';
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
      <ThemeProvider>
        <NotificationProvider>
          <PokemonProvider>
            <FavoritesProvider>
              <TeamBuilderProvider>
                <Router>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<PokemonDashboard />} />
                      <Route path="/pokemon/:id" element={<PokemonDetail />} />
                      <Route path="/favorites" element={<FavoritesList />} />
                      <Route path="/teams" element={<TeamBuilder />} />
                      <Route path="/battle" element={<BattleSimulator />} />
                      <Route path="/stats" element={<Statistics />} />
                    </Routes>
                  </Layout>
                </Router>
              </TeamBuilderProvider>
            </FavoritesProvider>
          </PokemonProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
// Register service worker for offline capabilities