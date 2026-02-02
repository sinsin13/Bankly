import { Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import UserLogin from './pages/UserLogin';
import RegisterUser from './pages/RegisterUser';
import ProductSelection from './pages/Productselection';
import KYCFlow from './pages/KYCFlow';
import AccountCreation from './pages/Accountcreation';

// Admin pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Customers from "./admin/pages/Customers";
import Approvals from "./admin/pages/Approvals";
import Transactions from "./admin/pages/Transactions";

// Auth protection
import RequireAdminAuth from './routes/RequireAdminAuth';
import RequireUserAuth from './routes/RequireUserAuth';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/register" element={<RegisterUser />} />
      
      {/* Protected User Routes */}
      <Route 
        path="/product-selection" 
        element={
          <RequireUserAuth>
            <ProductSelection />
          </RequireUserAuth>
        } 
      />
      
      <Route 
        path="/kyc-flow" 
        element={
          <RequireUserAuth>
            <KYCFlow />
          </RequireUserAuth>
        } 
      />
      
      <Route 
        path="/account-creation" 
        element={
          <RequireUserAuth>
            <AccountCreation />
          </RequireUserAuth>
        } 
      />
      
      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <AdminLayout />
          </RequireAdminAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;