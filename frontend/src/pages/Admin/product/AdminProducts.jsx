import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import AdminHeader from '../../../components/AdminHeader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../Assets/adminStyle.css'
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {


    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [categorydata, setCategoryData] = useState([]);
    const [mstatus, setMStatus] = useState(["best", "latest", "upcomming"]);
    const [editid, setEditid] = useState("");

    const [category, setCategory] = useState("");
    const [name, setName] = useState("")
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");

    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const getProduct = async () => {
        let data = await fetch(`http://localhost:8000/api/v1/product/productView?page=${currentPage}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            }
        });
        let res = await data.json();
        if (res.success) {
            setProducts(res.products);
            setTotalPages(res.totalPages);
        }
    };

    const handleClose = () => {
        setShow(false);
        setEditid('');
    };
    const handleShow = () => setShow(true);



    const getCategory = async () => {
        try {
            let data = await fetch(`http://localhost:8000/api/v1/category/categoryView`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            })
            let res = await data.json();
            if (res.success) {
                setCategoryData(res.category)
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }




    const handleSubmit = async (e) => {

        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('name', name);
            formData.append('image', image);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('marketstatus', status);
            formData.append('gender', gender);

            let url = 'http://localhost:8000/api/v1/product/productAdd';
            let method = 'POST';

            if (editid) {
                url = `http://localhost:8000/api/v1/product/productUpdate?id=${editid}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                },
                body: formData
            });
            let res = await response.json();
            // console.log(res);
            if (res.success) {
                setCategory("")
                setName("");
                setImage([])
                setPrice("")
                setDescription("")
                setStatus("")   
                getProduct();
                handleClose();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    const deleteProduct = async (id) => {
        try {
            let productFetch = await fetch(`http://localhost:8000/api/v1/product/productDelete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth?.token}`
                }
            });
            let res = await productFetch.json();
            if (res.success) {
                alert(res.message);
                getProduct();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const editProduct = async (id) => {
        let single = await fetch(`http://localhost:8000/api/v1/product/productEdit?id=${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`
            },
        });
        let res = await single.json();
        setCategory(res.product.categoryId)
        setName(res.product.name);
        setImage(res.product.image)
        setPrice(res.product.price)
        setDescription(res.product.description)
        setStatus(res.product.marketstatus)
        setGender(res.product.gender);
        setEditid(res.product._id);
        handleShow();
    };


    useEffect(() => {
        getCategory()
        getProduct()
    }, [currentPage])

    const marketStatusEdit = async (value, id) => {

        let all = await fetch(`http://localhost:8000/api/v1/product/mstatusUpdate?id=${id}`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                mstatus: value
            })
        })
        let res = await all.json();
        if (res.success) {
            getProduct()
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
        <>
            <div>
                <div>
                    <div className="col-lg-12 d-flex">
                        <div className="col-lg-2 left-slide-admin">
                            <AdminHeader />
                        </div>
                        <div className="col-lg-10">
                            <header>
                                <div className="justify-content-end d-flex px-5 py-3" ><button className='btn white' onClick={handleLogout}>Logout</button></div>
                            </header>
                            <div className="container m-5">
                                <div className="col-lg-12">
                                    <Button variant="primary" className='my-2' onClick={handleShow}>
                                        Add Product
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{editid ? 'Edit Products' : 'Add Products'}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Category</label>
                                                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='form-control'>
                                                        <option>---select category---</option>
                                                        {
                                                            categorydata.map((cat) => {
                                                                return (
                                                                    <option value={cat._id}>{cat.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="exampleInputEmail1">Name</label>
                                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label htmlFor="exampleInputPassword1">Image</label>
                                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />

                                                    {
                                                        editid ? <img src={image} alt="Product" width="50" className="mt-2" /> : ''
                                                    }

                                                </div>

                                                <div className="form-group mt-3">
                                                    <label htmlFor="exampleInputEmail1">Price</label>
                                                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter price" />
                                                </div>

                                                <div className="form-group mt-3">
                                                    <label htmlFor="exampleInputEmail1">Description</label>
                                                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter description" />
                                                </div>

                                                <div className='form-group mt-3'>
                                                    <label htmlFor="exampleInputEmail1">Market status</label>
                                                    <select onChange={(e) => setStatus(e.target.value)} value={status} className='form-control'>
                                                        <option>---select status---</option>
                                                        {
                                                            mstatus.map((st) => {
                                                                return (
                                                                    <option value={st}>{st}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="exampleInputEmail1">Gender</label>
                                                    <select onChange={(e) => setGender(e.target.value)} value={gender} className='form-control'>
                                                        <option>---select gender---</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>


                                                <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                            </form>
                                        </Modal.Body>
                                    </Modal>

                                    <section id="cart" className="section-p1 admin-section-p1">
                                        <table width="100%">
                                            <thead>
                                                <tr>
                                                    <td>No.</td>
                                                    <td>Product</td>
                                                    <td>Image</td>
                                                    <td>Price</td>
                                                    <td>Gender</td>
                                                    <td>Description</td>
                                                    <td>Status</td>
                                                    <td>Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.map((p, index) => {
                                                        return (
                                                            <tr key={p._id} >
                                                                <td>{++index}</td>
                                                                <td>{p.name}</td>
                                                                <td>
                                                                    <img src={p.image} alt="" width='100px' />
                                                                </td>
                                                                <td>₹{p.price}</td>
                                                                <td>{p.gender}</td>
                                                                <td>{p.description}</td>
                                                                <td>
                                                                    <select onChange={(e) => marketStatusEdit(e.target.value, p._id)} className='form-control select-box1 w-75 mx-4 '>
                                                                        <option>---select status---</option>
                                                                        {
                                                                            mstatus.map((mstatus) => {

                                                                                return (
                                                                                    p.marketstatus === mstatus ? (
                                                                                        <option value={p.marketstatus} selected>{p.marketstatus}</option>
                                                                                    ) : (
                                                                                        <option>{mstatus}</option>
                                                                                    )
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => deleteProduct(p._id)} className='btn btn-danger mx-2'>Delete</button>
                                                                    <button onClick={() => editProduct(p._id)} className='btn btn-primary mx-2'>Edit</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </section>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                            Previous
                                        </button>
                                        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                            Next
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}

export default AdminAddProduct
