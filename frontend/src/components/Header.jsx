import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import '../Assets/header.css';
import { IoCartOutline } from 'react-icons/io5';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const { setSearchResults } = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: null
        });
        localStorage.removeItem('auth');
        alert('Log out successfully.');
        navigate('/home');
    };

    const getCart = async () => {
        let headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`
        }

        if (auth?.user?._id) {
            let data = await fetch(`http://localhost:8000/api/v1/cart/cartView?userId=${auth?.user?._id}`, { headers }, {
                method: 'GET',
                headers: headers
            });
            let res = await data.json();
            if (res.success) {
                setCart(res.cart);
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            let data = await fetch(`http://localhost:8000/api/v1/product/search?query=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            });

            let res = await data.json();
            if (res.success) {
                setSearchResults(res.products);
                navigate('/products');
            }
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    }


    // console.log(auth);

    if (auth?.token) {
        getCart();
    }
    return (
        <div>
            <section id="header">
                <a href="#" ><img src="https://res-console.cloudinary.com/dh74x8sny/media_explorer_thumbnails/e830a8abcf9ff38fc39548465faea2cc/detailed" alt="Logo" width="180px" /></a>
                <div>
                    <ul id="navbar">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {auth.token && auth.user ? (
                            <>

                                {auth.user.role === 'admin' && <li><Link to="/category">Category</Link></li>}

                                <li><Link onClick={handleLogout}>Logout</Link></li>
                                <li><Link to={'/profile'} ><FaUserCircle className='user-btn' /></Link></li>
                                <li>
                                    <Link to={'/cart'} id="lg-bag">
                                        <IoCartOutline className='header-i' />
                                        <span className="quantity">{cart.length}</span>
                                    </Link>
                                </li>
                                <li>
                                    <form className='search-form d-flex' onSubmit={handleSearch}>
                                        <input
                                            className='search'
                                            type="text"
                                            placeholder="Search your products..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <button className='search-button' type='submit'><FaSearch /></button>
                                    </form></li>

                            </>
                        ) : (
                            <>
                                <li><Link to="/">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                        <li><a href="#" id="close"><i className="far fa-times" /></a></li>
                    </ul>
                </div>

                <div id="mobile">
                    <a href="cart.html">
                        <IoCartOutline className='i' />
                        <span className="quantity">{cart.length}</span>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Header;
