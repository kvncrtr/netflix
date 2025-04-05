import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NavBar from './components/navbar/NavBar';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated } = store.getState().auth;

  // Don't show navbar on login and signup pages
  const shouldShowNavbar = isAuthenticated || location.pathname === '/';

  return (
    <div className="App">
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
