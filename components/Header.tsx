import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Coins } from 'lucide-react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { coins } = useAppContext();

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-4 max-w-md mx-auto border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 font-bold px-3 py-1.5 rounded-full shadow-sm">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span>{coins.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;