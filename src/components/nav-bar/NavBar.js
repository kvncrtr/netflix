import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
   return (
      <nav className="navbar">
         <div className="navbar-brand">
            <Link to="/">Netflix Clone</Link>
         </div>
         <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tv-series">TV Series</Link>
            <Link to="/bookmark">Bookmarks</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
         </div>
      </nav>
   );
};

export default NavBar; 