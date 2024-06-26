import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPen } from 'react-icons/fa';

const Profile = () => {
    const [auth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePasswordModalClose = () => setShowPasswordModal(false);
    const handlePasswordModalShow = () => setShowPasswordModal(true);

    const getUser = async () => {
        if (auth?.user?._id) {
            try {
                let response = await fetch(`http://localhost:8000/api/v1/auth/getUserprofile?id=${auth?.user?._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth?.token}`
                    }
                });
                let res = await response.json();
                if (res.success) {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phone);
                    setPassword(res.data.password);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:8000/api/v1/auth/updateUser?id=${auth?.user?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone
                })
            });
            let res = await response.json();
            if (res.success) {
                toast.success("Profile successfully updated");
                getUser();
                handleClose();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            toast.error('Error updating profile');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:8000/api/v1/auth/changePassword?id=${auth?.user?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            });
            let res = await response.json();
            if (res.success) {
                toast.success("Password successfully changed");
                handlePasswordModalClose();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.error('Error changing password:', err);
            toast.error('Error changing password');
        }
    };

    return (
        <div>
            <Header />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="form-control"
                                id="name"
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                className="form-control"
                                id="phone"
                                placeholder="Enter Phone"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showPasswordModal} onHide={handlePasswordModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleChangePassword}>
                        <div className="form-group mt-3">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                value={currentPassword}
                                className="form-control"
                                id="currentPassword"
                                placeholder="Enter Current Password"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                className="form-control"
                                id="newPassword"
                                placeholder="Enter New Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>

            <section id="prodetails" className="section-p1">
                <div className="single-pro-image">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png"
                        width="80%"
                        id="MainImg"
                        alt="Profile"
                    />
                </div>
                <div className="single-pro-details">
                    <h4>Profile Details</h4>
                    <h4 className='text-capitalize'>{name}</h4>
                    <h6>{email}</h6>
                    <h6>+91 {phone}</h6>
                    <h6>
                        <FaPen className='mb-1 cursor-pointer' onClick={handlePasswordModalShow}/> Password : <input type="password" value={password} disabled className='border-0 pass-box' />
                    </h6>
                    <button className="btn normal my-2" onClick={handleShow}>Edit Profile</button>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default Profile;
