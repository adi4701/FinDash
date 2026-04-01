import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Users from './pages/Users';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<DashboardLayout />}>
            {/* Open to all roles */}
            <Route element={<ProtectedRoute allowedRoles={['viewer', 'analyst', 'admin']} />}>
              <Route path="/" element={<Dashboard />} />
            </Route>

            {/* Open to analyst and admin */}
            <Route element={<ProtectedRoute allowedRoles={['analyst', 'admin']} />}>
              <Route path="/records" element={<Records />} />
            </Route>

            {/* Open to admin only */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
