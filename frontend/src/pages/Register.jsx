import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import '../Assets/css/Register.css'
const Register = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      let all = await fetch(`http://localhost:8000/api/v1/auth/registeruser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, email, phone, password
        })
      });


      let res = await all.json();
      if (res.success) {
        toast.success(res.message);
        navigate('/')
      }

    } catch (err) {
      console.log(err);
      return false;
    }
  }



  return (
    <>
      <Header />
        <div className="header-container">
          <div className="header">
            <h4>Create Account</h4>
          </div>
          <form action className="form" id="form" onSubmit={handelSubmit}>
            <div className="form-control input-box1">
              <label>Username</label> 
              <input type="text" placeholder="abc123" id="username" onChange={(e) => setName(e.target.value)} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
              <small>Error Message</small>
            </div>
            <div className="form-control input-box1">
              <label>Email</label>
              <input type="email" placeholder="abc123@gmail.com" id="email" onChange={(e) => setEmail(e.target.value)} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
              <small>Error Message</small>
            </div>
            <div className="form-control input-box1">
              <label>Phone</label>
              <input type="text" placeholder="phone" id="phone"  onChange={(e) => setPhone(e.target.value)}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
              <small>Error Message</small>
            </div>
            <div className="form-control input-box1">
              <label>Password</label>
              <input type="password" placeholder="confirm your password" id="password2" onChange={(e) => setPassword(e.target.value)}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
              <small>Error Message</small>
            </div>
            <button>Submit</button>
            <p class="message my-3" align="center">Already registered? <Link to={'/'}>Sign In</Link></p>
          </form>
        </div>
      <ToastContainer />
    </>
  )
}

export default Register