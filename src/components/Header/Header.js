import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.css';
import { AuthContext } from '../../context/UserContext';

const Header = () => {
    const { user, logoOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logoOut()
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid ?
                        <>
                            <Link onClick={handleLogOut}>LogOut</Link>
                            <Link>{user?.email}</Link>
                        </>
                        :
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Loign</Link>
                        </>
                }
            </div>
        </nav>
    );
};

export default Header;