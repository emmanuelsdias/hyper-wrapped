import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import CategoriesPage from './pages//wrapped/CategoriesPage';
import MonthlyOverviewPage from './pages//wrapped/MonthlyOverviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wrapped" element={<CategoriesPage />} />
        <Route path="/wrapped/categories" element={<CategoriesPage />} />
        <Route path="/wrapped/monthly-overview" element={<MonthlyOverviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
