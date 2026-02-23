import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from '@vibecoding/shared';
import '@vibecoding/shared/styles';
import CategoriesBar from './components/CategoriesBar';
import Footer from './components/Footer';
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
import { useAuthStore } from './stores/authStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const user = useAuthStore((s) => s.user);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  useEffect(() => {
    const handler = () => setSearchOpen(true);
    document.addEventListener('open-search', handler);
    return () => document.removeEventListener('open-search', handler);
  }, []);

  return (
    <>
      <div className="cyber-grid-bg" />
      <div className="scan-line" />
      <ScrollToTop />
      <Header
        logoText="VIBECODER" logoImage="/logo.png"
        logoTo="/"
        onOpenSearch={openSearch}
        searchPlaceholder="Найти услуги"
        loginPath="/auth"
        profilePath="/dashboard"
      />
      <CategoriesBar />
      <main className="pt-[100px] min-h-screen bg-void relative z-[1]">
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
      <Footer />
      <BottomNav onOpenSearch={openSearch} />
      <CommandPalette isOpen={searchOpen} onClose={closeSearch} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#13131a',
            color: '#e0e0e0',
            border: '1px solid rgba(0, 255, 249, 0.2)',
            fontFamily: "'Rajdhani', sans-serif",
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
