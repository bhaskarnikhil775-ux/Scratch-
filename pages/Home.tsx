
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import AdModal from '../components/AdModal';
import Modal from '../components/Modal';
import { Gift, CheckCircle } from 'lucide-react';
import { TransactionType } from '../types';

const ScratchCardGame = () => {
    // This is a simplified visual representation.
    const [scratched, setScratched] = useState(false);
    
    return (
        <div className="relative w-full aspect-[1.618] bg-gray-200 rounded-xl overflow-hidden cursor-pointer" onClick={() => setScratched(true)}>
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center transition-opacity duration-500 ${scratched ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-white text-2xl font-bold">SCRATCH HERE</p>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center bg-yellow-300">
                <p className="text-yellow-800 text-lg">You Won</p>
                <p className="text-5xl font-bold text-yellow-900">10</p>
                <p className="text-yellow-800 text-lg">Coins</p>
            </div>
        </div>
    );
};

const SpinWheelGame = () => {
    // Simplified visual representation
    return (
        <div className="relative w-48 h-48 mx-auto">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-green-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                SPIN
            </div>
            <div className="absolute -top-2 left-1/2 -ml-3 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-red-500"></div>
        </div>
    );
};


const Home: React.FC = () => {
    const { addEarning, dailyStats, resetDailyStats, getTodaysEarnings, isNewUser, clearNewUserFlag } = useAppContext();
    const [showAd, setShowAd] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        resetDailyStats();
        if(isNewUser){
            setShowWelcomeModal(true);
            clearNewUserFlag();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTaskCompletion = (taskType: 'scratch' | 'spin') => {
        // In a real app, you would update dailyStats here
        const earnAmount = 10;
        const transactionType = taskType === 'scratch' ? TransactionType.SCRATCH : TransactionType.SPIN;
        addEarning(transactionType, earnAmount);
        setShowAd(true);
    };

    const dailyCap = 300;
    const todaysEarnings = getTodaysEarnings();
    const progress = Math.min((todaysEarnings / dailyCap) * 100, 100);

  return (
    <div className="bg-white min-h-screen">
      <Header title="Home" />
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} />
      <Modal isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} title="Congratulations! 🎉">
          <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg text-gray-700">You've received a welcome bonus of</p>
              <p className="text-4xl font-bold text-indigo-600 my-2">50 Coins!</p>
              <button onClick={() => setShowWelcomeModal(false)} className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Start Earning
              </button>
          </div>
      </Modal>

      <div className="p-4 space-y-6">
        <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-600">Daily Earning Limit</p>
                <p className="text-sm font-bold text-indigo-600">{todaysEarnings} / {dailyCap} Coins</p>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
            </div>
        </div>
      
        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Scratch Cards</h2>
            <p className="text-gray-500 text-sm mb-4">You have 10 cards left today.</p>
            <ScratchCardGame />
            <button onClick={() => handleTaskCompletion('scratch')} className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                Scratch Now & Earn 10 Coins
            </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Spin Wheel</h2>
            <p className="text-gray-500 text-sm mb-4">You have 10 spins left today.</p>
            <div className="flex justify-center my-4">
                <SpinWheelGame />
            </div>
            <button onClick={() => handleTaskCompletion('spin')} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-sm">
                Spin Now & Earn 10 Coins
            </button>
        </div>

        <Link to="/profile">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-lg text-white text-center active:scale-95 transition-transform duration-150">
                <Gift className="w-10 h-10 mx-auto mb-2"/>
                <h3 className="text-lg font-bold">Refer & Earn BIG!</h3>
                <p className="text-sm opacity-90">Get 200 coins for every friend who joins!</p>
            </div>
        </Link>

      </div>
    </div>
  );
};

export default Home;
