import React from 'react';
import AdminHeader from '../../../components/AdminHeader';
import Table from 'react-bootstrap/Table';
import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';
import '../../../Assets/adminStyle.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState('');
  const [categoryname, setCategoryname] = useState("");
  const [editid, setEditid] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setCategoryname('');
    setEditid('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editid) {
      let edit = await fetch(`http://localhost:8000/api/v1/category/categoryUpdate?id=${editid}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          name: categoryname
        })
      });
      let res = await edit.json();
      if (res.success) {
        alert(res.message);
        setEditid("");
        setCategoryname("");
        getCategory();
      }
    } else {
      let add = await fetch(`http://localhost:8000/api/v1/category/categoryAdd`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        },
        body: JSON.stringify({
          name: categoryname
        })
      });
      let msg = await add.json();
      if (msg.success) {
        alert(msg.message);
        setCategoryname("");
        getCategory();
      }
    }
    handleClose();
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

  const deleteCategory = async (id) => {
    try {
      let cateFetch = await fetch(`http://localhost:8000/api/v1/category/categoryDelete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
      let res = await cateFetch.json();
      console.log(res);
      if (res.success) {
        alert(res.message);
        getCategory();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const editCategory = async (id) => {
    let single = await fetch(`http://localhost:8000/api/v1/category/categoryEdit?id=${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`
      },
    });
    let res = await single.json();
    setCategoryname(res.singlecategory.name);
    setEditid(res.singlecategory._id);
    handleShow();
  };

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
    getCategory();
  }, []);

  return (
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
              <div className="col-lg-8">
                <Button variant="primary" className='my-2' onClick={handleShow}>
                  Add Category
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{editid ? 'Edit Category' : 'Add Category'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Category Name"
                          onChange={(e) => setCategoryname(e.target.value)}
                          value={categoryname}
                        />
                      </Form.Group>
                      <Button type='submit' variant="primary">
                        {editid ? 'Update Category' : 'Add Category'}
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>

                <Table className='category-table' hover>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Category Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      category.length > 0 ? (
                        category.map((val, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{val.name}</td>
                            <td>
                              <button onClick={() => deleteCategory(val._id)} className='btn btn-danger'>Delete</button>
                              <button onClick={() => editCategory(val._id)} className='btn btn-primary mx-2'>Edit</button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;