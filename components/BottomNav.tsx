import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Wallet, History, User } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/wallet', label: 'Wallet', icon: Wallet },
  { path: '/history', label: 'History', icon: History },
  { path: '/profile', label: 'Profile', icon: User },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] max-w-md mx-auto border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full transition-colors duration-200 ${
                isActive
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-500'
              }`
            }
          >
            {/* FIX: Use NavLink's children as a render prop to get access to the `isActive` state for child components. */}
            {({ isActive }) => (
              <>
                <item.icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;