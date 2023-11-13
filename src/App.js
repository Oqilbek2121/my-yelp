import React from "react";
import './components/styles/style.css'
import Dashboard from './components/Dashboard';
import NotFound from './components/Private/NotFound';
import ForgotPassword from './components/Register/ForgotPassword';
import RegisterAndLogin from './components/Register/RegisterAndLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="main">
        <Router>
          <Routes>
            <Route path="/" element={<RegisterAndLogin />}></Route>
            <Route path="/reset" element={<ForgotPassword />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
