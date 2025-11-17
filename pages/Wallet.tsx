
import React, { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import AdModal from '../components/AdModal';
import { useAppContext } from '../context/AppContext';
import { TransactionType, WithdrawalOption } from '../types';
import { AlertTriangle, CheckCircle, CreditCard, Banknote } from 'lucide-react';

const UPIIcon = () => (
    <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full border-2 border-dashed border-yellow-400">
        <Banknote className="w-6 h-6 text-yellow-600"/>
    </div>
);

const GiftCardIcon = () => (
    <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full border-2 border-dashed border-green-400">
        <CreditCard className="w-6 h-6 text-green-600"/>
    </div>
);

const withdrawalOptions: WithdrawalOption[] = [
  {
    type: TransactionType.UPI,
    icon: <UPIIcon />,
    tiers: [
      { rupees: 15, coins: 900 },
      { rupees: 50, coins: 4500 },
      { rupees: 100, coins: 9000 },
    ],
    inputLabel: 'Enter UPI ID',
    inputPlaceholder: 'yourname@upi',
  },
  {
    type: TransactionType.GIFT_CARD,
    icon: <GiftCardIcon />,
    tiers: [
      { rupees: 15, coins: 1500 },
      { rupees: 50, coins: 7500 },
    ],
    inputLabel: 'Enter Email ID',
    inputPlaceholder: 'youremail@example.com',
  },
];

const Wallet: React.FC = () => {
    const { coins, addTransaction } = useAppContext();
    const [selectedOption, setSelectedOption] = useState<WithdrawalOption | null>(null);
    const [selectedTier, setSelectedTier] = useState<{rupees: number, coins: number} | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [adModalOpen, setAdModalOpen] = useState(false);

    const handleWithdraw = () => {
        if (!selectedTier || !selectedOption || !inputValue) return;

        if (coins < selectedTier.coins) {
            setErrorModalOpen(true);
            return;
        }

        setAdModalOpen(true);
    };
    
    const processWithdrawal = () => {
         if (!selectedTier || !selectedOption || !inputValue) return;
        const success = addTransaction({
            type: selectedOption.type,
            amountCoins: selectedTier.coins,
            amountRupees: selectedTier.rupees,
            details: inputValue,
        });

        if (success) {
            setSuccessModalOpen(true);
            setSelectedOption(null);
            setSelectedTier(null);
            setInputValue('');
        }
    }

    const handleAdClose = () => {
        setAdModalOpen(false);
        processWithdrawal();
    };

    return (
        <div className="bg-white min-h-screen">
            <Header title="Wallet" />
            <AdModal isOpen={adModalOpen} onClose={handleAdClose} />

            <div className="p-4 space-y-6">
                <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                    <p className="text-sm opacity-80">Your Balance</p>
                    <p className="text-5xl font-bold my-1">{coins.toLocaleString()}</p>
                    <p className="text-sm opacity-80">Coins</p>
                </div>

                <h2 className="text-xl font-bold text-gray-800">Redeem Coins</h2>
                
                {withdrawalOptions.map(option => (
                    <div key={option.type} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center mb-4">
                            {option.icon}
                            <h3 className="text-lg font-bold text-gray-800 ml-4">{option.type}</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {option.tiers.map(tier => (
                                <button
                                    key={tier.coins}
                                    onClick={() => { setSelectedOption(option); setSelectedTier(tier); }}
                                    className={`p-3 rounded-lg text-center border-2 transition-all ${selectedTier?.coins === tier.coins && selectedOption?.type === option.type ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-800 hover:bg-indigo-50 hover:border-indigo-300 border-gray-200'}`}
                                >
                                    <p className="font-bold text-lg">₹{tier.rupees}</p>
                                    <p className={`text-xs ${selectedTier?.coins === tier.coins && selectedOption?.type === option.type ? 'text-indigo-200' : 'text-gray-500'}`}>{tier.coins.toLocaleString()} Coins</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {selectedOption && selectedTier && (
                    <div className="p-4 rounded-xl bg-white shadow-md border border-gray-200 animate-in fade-in-0 slide-in-from-bottom-5">
                        <label htmlFor="withdraw-input" className="block text-sm font-medium text-gray-700 mb-1">{selectedOption.inputLabel}</label>
                        <input
                            id="withdraw-input"
                            type={selectedOption.type === TransactionType.GIFT_CARD ? 'email' : 'text'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={selectedOption.inputPlaceholder}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                            onClick={handleWithdraw}
                            disabled={!inputValue.trim()}
                            className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Withdraw ₹{selectedTier.rupees}
                        </button>
                    </div>
                )}
            </div>

            <Modal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} title="Not Enough Coins">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Enough coin required. Please collect more coins and try again.</p>
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setErrorModalOpen(false)} className="w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Confirm
                        </button>
                        {/* In a real app this would navigate to home */}
                        <button onClick={() => setErrorModalOpen(false)} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                            Earn More
                        </button>
                    </div>
                </div>
            </Modal>
            
            <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title="Success! 🎉">
                 <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-700 mb-2">Withdrawal request placed successfully!</p>
                    <p className="text-sm text-gray-500">Your request is now pending and will be processed soon. You can check the status in the History tab.</p>
                    <button onClick={() => setSuccessModalOpen(false)} className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                        Awesome!
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Wallet;
