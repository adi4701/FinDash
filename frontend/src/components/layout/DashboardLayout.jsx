import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">FinDash Service</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">Hello, {user.name} ({user.role})</span>
            <button
              onClick={logout}
              className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto w-full max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
