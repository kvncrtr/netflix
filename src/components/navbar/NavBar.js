import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './NavBar.css';

const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user, isAuthenticated } = useSelector((state) => state.auth);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
   };

   return (
      <nav className="navbar">
         <div className="navbar-container">
            <Link to="/" className="logo">
               Netflix Clone
            </Link>

            <div className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
               <Link to="/" className="nav-link">
                  Home
               </Link>
               <Link to="/movies" className="nav-link">
                  Movies
               </Link>
               <Link to="/tv-series" className="nav-link">
                  TV Series
               </Link>
               {isAuthenticated && (
                  <Link to="/bookmarks" className="nav-link">
                     Bookmarks
                  </Link>
               )}
            </div>

            <div className="user-section">
               {isAuthenticated ? (
                  <>
                     <span className="user-greeting">Hello, {user?.name}</span>
                     <button className="logout-button" onClick={handleLogout}>
                        Logout
                     </button>
                  </>
               ) : (
                  <Link to="/login" className="login-link">
                     Login
                  </Link>
               )}
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
               <span className="menu-icon"></span>
            </button>
         </div>
      </nav>
   );
};

export default NavBar; 