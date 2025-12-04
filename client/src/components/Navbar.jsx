import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">ServiceDirectory</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin Panel</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
