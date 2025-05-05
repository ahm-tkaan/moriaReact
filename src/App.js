import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGuard from './auth/components/AuthGuard';
import Home from './pages/Home';
import DailyHoroscope from './pages/DailyHoroscope';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import LoginForm from './auth/components/LoginForm';
import RegisterForm from './auth/components/RegisterForm';
import './App.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route 
                path="/daily-horoscope" 
                element={
                  <AuthGuard>
                    <DailyHoroscope />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <div>Dashboard - Soon</div>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/profile/edit" 
                element={
                  <AuthGuard>
                    <ProfileEdit />
                  </AuthGuard>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
