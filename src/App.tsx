import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import ProLayouts from './layouts';
import './App.less';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ProLayouts />} />
    </Routes>
  );
}

export default App;
