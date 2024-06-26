import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const all = await fetch(`http://localhost:8000/api/v1/auth/loginuser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            });
            const res = await all.json();
            if (res.success) {
                localStorage.setItem('auth', JSON.stringify(res));
                setAuth({
                    ...auth,
                    token: res.token,
                    user: res.user
                });
                toast.success(res.message);
                if (res.user?.role === "admin") {
                    navigate('/dashboard');
                } else {
                    navigate('/home');
                }
            }else{
                toast.error(res.message)
            }
        } catch (err) {
            console.error(err);
            return false
        }
    };

    return (
        <div>
            <Header />
            <div className="header-container">
                <div className="header">
                    <h4>Login Account</h4>
                </div>
                <form action className="form" id="form" onSubmit={handelSubmit}>
                    <div className="form-control input-box1">
                        <label>Email</label>
                        <input type="email" placeholder="abc123@gmail.com" id="email" onChange={(e) => setEmail(e.target.value)} />
                        <i className="fas fa-check-circle" />
                        <i className="fas fa-exclamation-circle" />
                        <small>Error Message</small>
                    </div>
                    <div className="form-control input-box1">
                        <label>Password</label>
                        <input type="password" placeholder="confirm your password" id="password2" onChange={(e) => setPassword(e.target.value)} />
                        <i className="fas fa-check-circle" />
                        <i className="fas fa-exclamation-circle" />
                        <small>Error Message</small>
                    </div>
                    <button >Submit</button>
                    <p className="message my-3">Not registered? <Link to={'/register'}>Create an account</Link></p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );

};

export default Login;