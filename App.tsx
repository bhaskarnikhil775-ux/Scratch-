
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Profile from './pages/Profile';
import Layout from './components/Layout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    const { user } = useAppContext();

    return(
        <HashRouter>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Layout><Home /></Layout>
                    </ProtectedRoute>
                } />
                <Route path="/wallet" element={
                    <ProtectedRoute>
                        <Layout><Wallet /></Layout>
                    </ProtectedRoute>
                } />
                <Route path="/history" element={
                    <ProtectedRoute>
                        <Layout><History /></Layout>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Layout><Profile /></Layout>
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to={user ? "/" : "/signin"} replace />} />
            </Routes>
        </HashRouter>
    )
}

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
