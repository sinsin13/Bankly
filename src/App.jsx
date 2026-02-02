import { BrowserRouter, Routes, Route } from 'react-router-dom';
//public pages
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import RegisterUser from './pages/RegisterUser';
import Productselection from './pages/Productselection';


// admin layout + pages
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Customers from "./admin/pages/Customers";
import Approvals from "./admin/pages/Approvals";
import Transactions from "./admin/pages/Transactions";

/* USER */
import UserLayout from "./user/layout/UserLayout";
import UserDashboard from "./user/pages/UserDashboard";
import Accounts from "./user/pages/Accounts";
import TransactionsPage from "./user/pages/Transactions";
import FundTransfer from "./user/pages/FundTransfer";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/product-selection" element={<Productselection />} />
  
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transfer" element={<FundTransfer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;