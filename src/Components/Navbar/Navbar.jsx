import React, { useContext, useRef, useState } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { useQuery } from '@tanstack/react-query';
// import nav_dropdown from '../Assets/nav_dropdown.png'
const Navbar = () => {
    const menuRef = useRef();
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState("shop")
    const { getTotalCartItems ,setCartItems} = useContext(ShopContext)
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle('open')
    }

    const id = localStorage.getItem('loginId')

    const navigate=useNavigate();
    const handelLogout = () => {
        setLoading(true)
        localStorage.removeItem('loginId');
        localStorage.removeItem('token')
        console.log('entered')
        setLoading(false);
        window.location.replace('/')
    }
 
    if (loading) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading...</p></div>
    }
    return (
        <div className='Navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>LETS-SHOP</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src="https://static.thenounproject.com/png/1144832-200.png" alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}> <Link style={{ textDecoration: 'none', color: '#626262' }} to='/'>Home</Link>  {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}> <Link style={{ textDecoration: 'none', color: '#626262' }} to='mens'>Men</Link>  {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}> <Link style={{ textDecoration: 'none', color: '#626262' }} to='/womens'>Women</Link>  {menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}> <Link style={{ textDecoration: 'none', color: '#626262' }} to='kids'>Kid</Link>  {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {
                    id ? <Link onClick={handelLogout} style={{ textDecoration: 'none', cursor: 'pointer', color: '#626262' }}><button>Logout</button></Link> : <Link style={{ textDecoration: 'none', cursor: 'pointer', color: '#626262' }} to='/login'><button>Login</button></Link>
                }

                <Link style={{ textDecoration: 'none', color: '#626262' }} to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;