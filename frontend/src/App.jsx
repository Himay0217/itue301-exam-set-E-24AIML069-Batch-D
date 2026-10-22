import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import FleetPage from './pages/FleetPage';
import MyBookingsPage from './pages/MyBookingsPage';

// Lazy-load AdminPanel so it is only fetched when the /admin route is visited
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar sits outside Routes so it renders on every page */}
      <Navbar />

      <Routes>
        {/* "/" → LoginPage (public) */}
        <Route path="/" element={<LoginPage />} />

        {/* "/fleet" → FleetPage (protected) */}
        <Route
          path="/fleet"
          element={
            <ProtectedRoute>
              <FleetPage />
            </ProtectedRoute>
          }
        />

        {/* "/my-bookings" → MyBookingsPage (protected) */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        {/* "/admin" → AdminPanel (lazy, protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback="Loading admin panel...">
                <AdminPanel />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
