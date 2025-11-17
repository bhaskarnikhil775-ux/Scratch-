
import React from 'react';
import BottomNav from './BottomNav';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-grow pb-20">
        <div className="max-w-md mx-auto h-full">
            {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
