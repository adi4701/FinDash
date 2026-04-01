import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Receipt, Users } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Sidebar() {
  const { user } = useAuth();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['viewer', 'analyst', 'admin'] },
    { name: 'Records', path: '/records', icon: Receipt, roles: ['analyst', 'admin'] },
    { name: 'Users', path: '/users', icon: Users, roles: ['admin'] },
  ];

  const allowedLinks = navLinks.filter(link => link.roles.includes(user?.role));

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="h-16 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-indigo-400">FinDash</h1>
      </div>
      <nav className="flex-1 py-4 space-y-1">
        {allowedLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center px-6 py-3 text-sm font-medium transition-colors',
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )
              )
            }
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
