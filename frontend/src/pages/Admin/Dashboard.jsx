import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import { IoPersonCircleOutline, IoCubeOutline, IoLayersOutline } from 'react-icons/io5';
import { TbReorder } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Assets/header.css'; // Example CSS for styling
import { useAuth } from '../../context/AuthContext';
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [order, setOrders] = useState([]);

  const getUser = async () => {
    let data = await fetch(`http://localhost:8000/api/v1/auth/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`
      }
    });

    let res = await data.json();

    if (res.success) {
      setUser(res.data);

    }
  };

  const deleteUser = async (id) => {
    try {
      let data = await fetch(`http://localhost:8000/api/v1/auth/deleteUser?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
      let res = await data.json();
      if (res.success) {
        alert(res.message);
        getUser();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const getProduct = async () => {
    let data = await fetch(`http://localhost:8000/api/v1/product/productView`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`
      }
    });

    let res = await data.json();
    // console.log(res);
    if (res.success) {
      setProduct(res.products);
    }
  };

  const getCategory = async () => {
    try {
      let cateFetch = await fetch(`http://localhost:8000/api/v1/category/categoryView`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
      let res = await cateFetch.json();
      if (res.success) {
        setCategory(res.category);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const getOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/order/orderView', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

//  console.log(order);
const handleLogout = () => {
  setAuth({
      ...auth,
      user: null,
      token: null
  });
  localStorage.removeItem('auth');
  alert('Log out successfully.');
  navigate('/');
};
  useEffect(() => {
    getUser();
    getProduct();
    getCategory();
    getOrders();
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="col-lg-12 d-flex">
            <div className="col-lg-2 left-slide-admin">
              <AdminHeader />
            </div>
            <div className="col-lg-10">
            <header>
                        <div className="justify-content-end d-flex px-5 py-3" ><button className='btn btn-white' onClick={handleLogout}>Logout</button></div>
                    </header>
              <div className="container m-5">
                <div className="main-content">
                  <div className="left-sidebar">
                    <div className="box">
                      <IoPersonCircleOutline className="icon" />
                      <div className="info">
                        <h2>{user.length}</h2>
                        <p>Total Users</p>
                      </div>
                    </div>
                    <div className="box">
                      <IoCubeOutline className="icon" />
                      <div className="info">
                        <h2>{product.length}</h2>
                        <p>Total Products</p>
                      </div>
                    </div>
                    <div className="box">
                      <IoLayersOutline className="icon" />
                      <div className="info">
                        <h2>{category.length}</h2>
                        <p>Total Categories</p>
                      </div>
                    </div>
                    <div className="box">
                      <TbReorder className="icon" />
                      <div className="info">
                        <h2>{order.length}</h2>
                        <p>Total Order</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-8'>
                    <div className="right-sidebar ">
                      <h2>All Users</h2>
                      <Table className='category-table' hover>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.length > 0 ? (
                              user.map((val, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{val.name}</td>
                                  <td>{val.email}</td>
                                  <td>{val.phone}</td>
                                  <td>
                                    <button onClick={() => deleteUser(val._id)} className='btn btn-danger'>Delete</button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3">No category available</td>
                              </tr>
                            )}
                        </tbody>
                      </Table>
                    </div>
                    <div className="right-sidebar ">
                      <h2>New Order</h2>
                      <Table className='category-table' hover>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Products</th>
                            <th>Date</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                                    {
                                        order.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{index + 1}</td>
                                                <td>{order.userId}</td>
                                                <td>
                                                    <ul>
                                                        {order.cartItems.map((item, i) => (
                                                            <li key={i}>{item.name} - Qty: {item.qty}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>{order.createdAt}</td>
                                                <td>{order.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >

      <ToastContainer />

    </>

  );
}

export default Dashboard;
