
import React from 'react';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { Transaction, TransactionStatus, TransactionType } from '../types';
import { Clock, CheckCircle, XCircle, FileText, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const statusStyles = {
    [TransactionStatus.PENDING]: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
    },
    [TransactionStatus.APPROVED]: {
        bg: 'bg-green-100',
        text: 'text-green-800',
    },
    [TransactionStatus.REJECTED]: {
        bg: 'bg-red-100',
        text: 'text-red-800',
    },
    [TransactionStatus.COMPLETED]: {
        bg: 'bg-green-100',
        text: 'text-green-800',
    }
}

const isEarning = (type: TransactionType) => {
    return [
        TransactionType.SCRATCH, 
        TransactionType.SPIN, 
        TransactionType.REFERRAL, 
        TransactionType.SIGNUP
    ].includes(type);
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const style = statusStyles[transaction.status];
    const earning = isEarning(transaction.type);
    const amountPrefix = earning ? '+' : '-';
    const amountColor = earning ? 'text-green-600' : 'text-red-600';

    const MainIcon = earning ? 
        <ArrowUpCircle className="w-8 h-8 text-green-500" /> : 
        <ArrowDownCircle className="w-8 h-8 text-red-500" />;

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div>
                {MainIcon}
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">{transaction.type}</p>
                    <p className={`font-bold ${amountColor}`}>{amountPrefix} {transaction.amountCoins.toLocaleString()} Coins</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                    <p>{new Date(transaction.date).toLocaleString()}</p>
                    {transaction.amountRupees && (
                         <p className={`font-semibold text-gray-700`}>₹{transaction.amountRupees}</p>
                    )}
                </div>
                 {transaction.status !== TransactionStatus.COMPLETED &&
                    <div className={`mt-2 text-xs font-medium inline-flex items-center px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                        {transaction.status}
                    </div>
                 }
            </div>
        </div>
    )
}

const History: React.FC = () => {
  const { transactions } = useAppContext();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="History" />
      <div className="p-4">
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map(tx => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-16 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold">No Transactions Yet</h3>
            <p className="mt-1">Your withdrawal history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
