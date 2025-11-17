
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`font-extrabold text-3xl ${className}`}>
      <span className="text-yellow-400">S</span>
      <span className="text-blue-500">c</span>
      <span className="text-red-500">r</span>
      <span className="text-green-500">a</span>
      <span className="text-yellow-400">t</span>
      <span className="text-blue-500">c</span>
      <span className="text-red-500">h</span>
      <span className="text-green-500">E</span>
      <span className="text-yellow-400">a</span>
      <span className="text-blue-500">r</span>
      <span className="text-red-500">n</span>
    </div>
  );
};

export default Logo;
