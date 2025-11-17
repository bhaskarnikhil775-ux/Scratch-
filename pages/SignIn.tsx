
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Logo from '../components/Logo';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M24 9.5c3.23 0 5.45 1.12 7.19 2.7l5.66-5.66C33.15 3.18 29.04 2 24 2 14.52 2 6.75 7.97 4.1 16.44l6.93 5.33C12.43 14.93 17.7 9.5 24 9.5z"></path>
        <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.55 2.76-2.17 5.1-4.64 6.7l6.81 5.24c3.97-3.64 6.33-9.08 6.33-15.9z"></path>
        <path fill="#FBBC05" d="M11.03 21.77c-.38-1.13-.6-2.33-.6-3.57s.22-2.44.6-3.57L4.1 9.34C2.84 12.07 2 15.34 2 19.2c0 3.86.84 7.13 2.1 9.86l6.93-5.29z"></path>
        <path fill="#EA4335" d="M24 46c5.99 0 10.9-1.95 14.52-5.28l-6.81-5.24c-1.99 1.34-4.57 2.14-7.71 2.14-6.3 0-11.57-5.43-13-12.72L4.1 32.56C6.75 41.03 14.52 46 24 46z"></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
    </svg>
);

const SignIn: React.FC = () => {
  const { signIn } = useAppContext();
  const navigate = useNavigate();

  const handleSignIn = () => {
    signIn();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center w-full max-w-sm">
        <Logo className="mb-4 inline-block" />
        <h1 className="text-xl font-semibold text-gray-700">Welcome to Scratch Earn</h1>
        <p className="text-gray-500 mt-1 mb-8">India’s Transparent Earning App!</p>

        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
             <h2 className="text-lg font-bold text-gray-800 mb-1">Scratch, Spin, Refer</h2>
             <p className="text-indigo-600 font-semibold mb-6">Earn Real Money Fast!</p>

            <button
                onClick={handleSignIn}
                className="w-full flex items-center justify-center bg-white text-gray-700 font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <GoogleIcon />
                Sign in with Google
            </button>
        </div>
        
        <p className="text-xs text-gray-400 mt-8">
            By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
