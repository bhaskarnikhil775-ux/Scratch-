
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, Transaction, TransactionStatus, TransactionType } from '../types';

interface DailyTaskStats {
  scratches: number;
  spins: number;
  date: string; // YYYY-MM-DD
}

interface AppContextType {
  user: User | null;
  coins: number;
  transactions: Transaction[];
  dailyStats: DailyTaskStats;
  signIn: () => void;
  signOut: () => void;
  addEarning: (type: TransactionType, amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => boolean;
  getTodaysEarnings: () => number;
  resetDailyStats: () => void;
  isNewUser: boolean;
  clearNewUserFlag: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'user_1a2b3c4d',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePic: 'https://picsum.photos/100',
  referralLink: 'https://scratchearn.in/ref/a1b2c3d4',
  isBanned: false,
};

const getInitialState = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getInitialState<User | null>('user', null));
  const [coins, setCoins] = useState<number>(() => getInitialState<number>('coins', 0));
  const [transactions, setTransactions] = useState<Transaction[]>(() => getInitialState<Transaction[]>('transactions', []));
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  
  const today = new Date().toISOString().split('T')[0];
  const [dailyStats, setDailyStats] = useState<DailyTaskStats>(() => {
    const savedStats = getInitialState<DailyTaskStats | null>('dailyStats', null);
    if (savedStats && savedStats.date === today) {
      return savedStats;
    }
    return { scratches: 0, spins: 0, date: today };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('coins', JSON.stringify(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  useEffect(() => {
    localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  const signIn = () => {
    const existingUser = getInitialState<User | null>('user', null);
    if (!existingUser) {
        setIsNewUser(true);
        setUser(MOCK_USER);
        const signupBonus = 50;
        setCoins(signupBonus);
        const bonusTransaction: Transaction = {
            id: `bonus_${Date.now()}`,
            date: new Date().toISOString(),
            type: TransactionType.SIGNUP,
            amountCoins: signupBonus,
            status: TransactionStatus.COMPLETED,
        };
        setTransactions([bonusTransaction]);
    } else {
        setUser(MOCK_USER);
    }
  };

  const signOut = () => {
    setUser(null);
    setCoins(0);
    setTransactions([]);
    localStorage.removeItem('user');
    localStorage.removeItem('coins');
    localStorage.removeItem('transactions');
    localStorage.removeItem('dailyStats');
  };

  const addEarning = (type: TransactionType, amount: number) => {
    setCoins((prevCoins) => prevCoins + amount);
    const newEarning: Transaction = {
        id: `earn_${Date.now()}_${type}`,
        date: new Date().toISOString(),
        type: type,
        amountCoins: amount,
        status: TransactionStatus.COMPLETED,
    };
    setTransactions(prev => [newEarning, ...prev]);
  };
  
  const clearNewUserFlag = () => {
    setIsNewUser(false);
  };

  const getTodaysEarnings = () => {
    return (dailyStats.scratches + dailyStats.spins) * 10;
  }
  
  const resetDailyStats = () => {
    const newDate = new Date().toISOString().split('T')[0];
    if (dailyStats.date !== newDate) {
        setDailyStats({ scratches: 0, spins: 0, date: newDate });
    }
  }

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'status'>): boolean => {
    if (coins < transaction.amountCoins) {
      return false;
    }

    setCoins((prev) => prev - transaction.amountCoins);
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      date: new Date().toISOString(),
      status: TransactionStatus.PENDING,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    return true;
  };

  return (
    <AppContext.Provider value={{ user, coins, transactions, dailyStats, signIn, signOut, addEarning, addTransaction, getTodaysEarnings, resetDailyStats, isNewUser, clearNewUserFlag }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
