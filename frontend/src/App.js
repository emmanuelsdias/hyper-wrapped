import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import WrappedPage from './pages/wrapped/WrappedPage';
import BiggestSpendingPage from './pages/wrapped/BiggestSpendingPage';
import MonthlyOverviewPage from './pages/wrapped/MonthlyOverviewPage';
import DailyAverageOverviewPage from './pages/wrapped/DailyAverageOverviewPage';
import MostFrequentCategoriesPage from './pages/wrapped/MostFrequentCategoriesPage';
import MostSpentCategoriesPage from './pages/wrapped/MostSpentCategoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wrapped" element={<WrappedPage />} />
        <Route path="/wrapped/biggest-spending" element={<BiggestSpendingPage />} />
        <Route path="/wrapped/monthly-overview" element={<MonthlyOverviewPage />} />
        <Route path="/wrapped/daily-average-overview" element={<DailyAverageOverviewPage />} />
        <Route path="/wrapped/most-frequent-categories" element={<MostFrequentCategoriesPage />} />
        <Route path="/wrapped/most-spent-categories" element={<MostSpentCategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
