import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, Header, useAuth } from '@vibecoding/shared';
import Footer from './components/Footer';
import type { FooterConfig } from './components/Footer';
import '@vibecoding/shared/styles';
import BottomNav from './components/BottomNav';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';
import Category from './pages/Category';
import GigDetail from './pages/GigDetail';
import UserProfile from './pages/UserProfile';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import CreateGig from './pages/CreateGig';
import { freelanceHeaderConfig, freelanceFooterConfig } from './config/shared';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handler = () => setSearchOpen(true);
    document.addEventListener('open-search', handler);
    return () => document.removeEventListener('open-search', handler);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header {...freelanceHeaderConfig} onOpenSearch={openSearch} />
      <main className="pt-16 min-h-screen bg-void">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:slug" element={<Category />} />
          <Route path="/gigs/:id" element={<GigDetail />} />
          <Route path="/users/:username" element={<UserProfile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/freelancer" element={
            <ProtectedRoute><FreelancerDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/create-gig" element={
            <ProtectedRoute><CreateGig /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer {...freelanceFooterConfig} />
      <BottomNav onOpenSearch={openSearch} />
      <CommandPalette isOpen={searchOpen} onClose={closeSearch} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a2e',
            color: '#e0e0e0',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
