import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import WrappedPage from './pages/WrappedPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wrapped" element={<WrappedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
