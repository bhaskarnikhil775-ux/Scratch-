
// FIX: Import React to use React.ReactNode type.
import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  referralLink: string;
  isBanned: boolean;
  banReason?: string;
}

export enum TransactionType {
  UPI = 'UPI Transfer',
  GIFT_CARD = 'Google Play Gift Card',
  SCRATCH = 'Scratch Card',
  SPIN = 'Spin Wheel',
  REFERRAL = 'Referral Bonus',
  SIGNUP = 'Signup Bonus',
}

export enum TransactionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  COMPLETED = 'Completed',
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amountCoins: number;
  status: TransactionStatus;
  amountRupees?: number;
  details?: string; // UPI ID or Email
}

export interface WithdrawalOption {
  type: TransactionType.UPI | TransactionType.GIFT_CARD;
  icon: React.ReactNode;
  tiers: {
    coins: number;
    rupees: number;
  }[];
  inputLabel: string;
  inputPlaceholder: string;
}
