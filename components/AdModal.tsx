
import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isOpen) {
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4 text-white">
      <Zap className="w-16 h-16 text-yellow-400 mb-4 animate-pulse" />
      <h2 className="text-2xl font-bold mb-2">Rewarded Ad</h2>
      <p className="text-gray-300 mb-6">Enjoy this short ad to support us!</p>
      <div className="w-full max-w-xs bg-gray-700 h-4 rounded-full overflow-hidden">
         <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-1000 ease-linear" style={{ width: `${(10 - countdown) * 10}%` }}></div>
      </div>
      <p className="mt-4 text-lg font-mono">Closing in {countdown}s...</p>
    </div>
  );
};

export default AdModal;
