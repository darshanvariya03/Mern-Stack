import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import Discountbanner from '../../components/Discountbanner';
import ScrollToTop from '../../components/scrollTop';

const SingleProdct = () => {

  const {id} = useParams();
  const [auth] = useAuth();
  const [product, setProduct] = useState('');

  const getProduct = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/v1/product/singleProduct?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
      
      let res = await response.json();
      if (res.success) {
        setProduct(res.record);
      } 
    } catch (err) {
      console.error(err);
      return false;
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

  useEffect(() => {
    getProduct();
    console.log(product);
  }, [id]);
  
  return (
    <div>
      <Header />
      <ScrollToTop/>
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img src={product.image} width="100%" id="MainImg" alt />
        </div>
        <div className="single-pro-details">
          <h6>{product.marketstatus}</h6>
          <h4>{product.name}</h4>
          <h2><del>₹{product.price * 2}</del> ₹{product.price}</h2>
          <h6>50% discount Today's</h6>
          <button className="btn normal" onClick={() => addCart(product._id)}>Add to Cart</button>
          <h4>Product Details</h4>
          <span>{product.description}</span>
        </div>
      </section>
      <Discountbanner/>
      <Footer />
      <ToastContainer/>

    </div>
  )
}

export default SingleProdct