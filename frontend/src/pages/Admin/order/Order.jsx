import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useAuth } from '../../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import AdminHeader from '../../../components/AdminHeader';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState(["pending", "processing", "shipped", "delivered", "cancelled"]);

    // Fetch orders on component mount
    useEffect(() => {
        getOrders();
    }, []);

    // Function to fetch orders from the server
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

    // Function to update order status
    const updateOrderStatus = async (value, id) => {

        let all = await fetch(`http://localhost:8000/api/v1/order/orderUpdate?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                ostatus: value
            })
        })
        let res = await all.json();
        console.log(res);
        if (res.success) {
            getOrders()
        }
    };

    const deleteOrder = async (id) => {
        try {
            let data = await fetch(`http://localhost:8000/api/v1/order/orderDelete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            });
            let res = await data.json();
            if (res.success) {
                alert(res.message);
                getOrders();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

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

    return (
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
                        <div className="col-lg-12">
                            <Table className='order-table' hover>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>User ID</th>
                                        <th>Cart Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, index) => (
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
                                                <td>${order.total.toFixed(2)}</td>
                                                <td>
                                                    <select onChange={(e) => updateOrderStatus(e.target.value, order._id)} className='form-control select-box1 w-75 mx-4 '>
                                                        <option>---select status---</option>
                                                        {
                                                            orderStatus.map((status) => {

                                                                return (
                                                                    order.orderstatus === status ? (
                                                                        <option value={order.orderstatus} selected>{order.orderstatus}</option>
                                                                    ) : (
                                                                        <option>{status}</option>
                                                                    )
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td><button className='btn btn-danger' onClick={(e) => deleteOrder(order._id)} >Delete</button></td>
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
    );
};

export default Order;
