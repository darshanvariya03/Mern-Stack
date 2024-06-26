import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { IoCartOutline } from 'react-icons/io5';
import { FaLongArrowAltRight } from "react-icons/fa";
import Footer from '../../components/Footer';
import { useSearch } from '../../context/SearchContext';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Discountbanner from '../../components/Discountbanner';
import ScrollToTop from '../../components/scrollTop';

const Product = () => {
  const [auth] = useAuth();
  const { searchResults } = useSearch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ marketstatus: 'all', gender: 'all', category: 'all' });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

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
      applyFilters(res.products);
    }
  };

  const getCategories = async () => {
    try {
      let data = await fetch(`http://localhost:8000/api/v1/category/categoryView`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
  
      let res = await data.json();
      console.log(res);
      if (res.success) {
        setCategories(res.category);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const addCart = async (id) => {
    try {
      let data = await fetch(`http://localhost:8000/api/v1/cart/singleProduct?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });

      let res = await data.json();
      if (res.success) {
        let product = res.record;
        let cartResponse = await fetch(`http://localhost:8000/api/v1/cart/cartAdd`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`
          },
          body: JSON.stringify({
            categoryId: product.categoryId,
            productId: id,
            name: product.name,
            price: product.price,
            qty: 1,
            image: product.image,
            userId: auth.user._id
          })
        });

        let cartRes = await cartResponse.json();
        if (cartRes.success) {
          toast.success(cartRes.message);
        }
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  }

  const applyFilters = (productsToFilter) => {
    let filtered = [...productsToFilter]; // Create a copy of products array

    if (filter.marketstatus !== 'all') {
      filtered = filtered.filter(product => product.marketstatus === filter.marketstatus);
    }

    if (filter.gender !== 'all') {
      filtered = filtered.filter(product => product.gender === filter.gender);
    }

    if (filter.category !== 'all') {
      filtered = filtered.filter(product => product.categoryId === filter.category);
    }

    setFilteredProducts(filtered);
  }

  useEffect(() => {
    getProduct();
    getCategories();
  }, [currentPage]);

  useEffect(() => {
    applyFilters(products);
  }, [filter]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setFilteredProducts(searchResults);
    }
  }, [searchResults]);

  return (
    <div>
      <Header />
      <ScrollToTop/>
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons and up to 70% off!</p>
      </section>
      <section className="filters" align="center">
        <div>
          <button className='btn white' onClick={() => setFilter({ marketstatus: 'all', gender: 'all', category: 'all' })}>All Products</button>
        </div>
        <div>
          <button className='btn white' onClick={() => setFilter({ ...filter, marketstatus: 'latest' })}>Latest Products</button>
          <button className='btn white' onClick={() => setFilter({ ...filter, marketstatus: 'best' })}>Best Products</button>
          <button className='btn white' onClick={() => setFilter({ ...filter, marketstatus: 'upcoming' })}>Upcoming Products</button>
        </div>
        <div>
          {
            categories.map(category => (
              <button key={category._id} className='btn white' onClick={() => setFilter({ ...filter, category: category._id })}>{category.name}</button>
            ))
          }
        </div>
        <div>
          <button className='btn white' onClick={() => setFilter({ ...filter, gender: 'male' })}>Male</button>
          <button className='btn white' onClick={() => setFilter({ ...filter, gender: 'female' })}>Female</button>
        </div>
      </section>
      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          {
            filteredProducts.map((item) => (

              <div className="pro" key={item._id}>
                <Link to={`/productView/${item._id}`}>
                  <img src={item.image} alt="" />
                  <div className="des">
                  <span>{item.gender}</span>
                    <h5>{item.name}</h5>
                    <span>{item.description}</span>
                    <h4>₹ {item.price}</h4>
                    <h4>{item.marketstatus}</h4>
                  </div>
                  <a onClick={() => addCart(item._id)}><IoCartOutline className='i' /></a>
                </Link>
              </div>
            ))
          }
        </div>
      </section>
      <div className="d-flex justify-content-center" id='pagination'>
        <button className="btn btn-secondary " onClick={handlePreviousPage} disabled={currentPage === 1}>
          <HiArrowLongLeft />
        </button>
        <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <HiArrowLongRight />
        </button>
      </div>
      <div className="my-3">
        <Discountbanner />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Product;
