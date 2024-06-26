import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { IoCartOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../components/Footer';
import Discountbanner from '../../components/Discountbanner';

const Home = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const getProducts = async () => {
    try {
      let data = await fetch(`http://localhost:8000/api/v1/product/userProduct`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });

      let res = await data.json();
      if (res.success) {
        setProducts(res.products);
        setLatestProducts(res.products.filter(product => product.marketstatus === 'latest'));
        console.log(latestProducts);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

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
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <section id="hero">
        <h4>Trade-in-fair</h4>
        <h2>Super value deals</h2>
        <h1>On all Products</h1>
        <p>Save more with coupons and up to 70% off!</p>
        <Link to={'/products'}><button>Shop Now</button></Link>
      </section>
      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          {
            products.map((item) => (
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
      <Discountbanner />
      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          {
            latestProducts.map((item) => (
              <div className="pro" key={item._id}>
                <img src={item.image} alt="" />
                <div className="des">
                  <h5>{item.name}</h5>
                  <span>{item.description}</span>
                  <h4>₹ {item.price}</h4>
                  <h4>{item.marketstatus}</h4>
                </div>
                <a onClick={() => addCart(item._id)}><IoCartOutline className='i' /></a>
              </div>
            ))
          }
        </div>
      </section>

      <section id="sm-banner" class="section-p1">
        <div class="banner-box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classic dress is on sales at cara</span>
          <button class="btn white">Learn More</button>

        </div>

        <div class="banner-box banner-box2">
          <h4>spring/summer</h4>
          <h2>upcoming season</h2>
          <span>The best classic dress is on sales at cara</span>
          <button class="btn white">Collection</button>

        </div>

      </section>

      <section id="banner3" class="section-p1">
        <div class="banner-box">

          <h2>SEASONAL SALES</h2>
          <h3>Winter Collection -50% OFF</h3>

        </div>

        <div class="banner-box banner-img2">

          <h2>SEASONAL SALES</h2>
          <h3>Winter Collection -50% OFF</h3>

        </div>

        <div class="banner-box banner-img3">

          <h2>SEASONAL SALES</h2>
          <h3>Winter Collection -50% OFF</h3>

        </div>

      </section>
      {/* <section id="product1" className="section-p1">
        <h2>Best Products</h2>
        <p>Top quality products</p>
        <div className="pro-container">
          {
            bestProducts.map((item) => (
              <div className="pro" key={item._id}>
                <img src={item.image} alt="" />
                <div className="des">
                  <h5>{item.name}</h5>
                  <span>{item.description}</span>
                  <h4>₹ {item.price}</h4>
                  <h4>{item.marketstatus}</h4>
                </div>
                <a onClick={() => addCart(item._id)}><IoCartOutline className='i' /></a>
              </div>
            ))
          }
        </div>
      </section>
      <section id="product1" className="section-p1">
        <h2>Upcoming Products</h2>
        <p>Stay tuned for these new releases</p>
        <div className="pro-container">
          {
            upcomingProducts.map((item) => (
              <div className="pro" key={item._id}>
                <img src={item.image} alt="" />
                <div className="des">
                  <h5>{item.name}</h5>
                  <span>{item.description}</span>
                  <h4>₹ {item.price}</h4>
                  <h4>{item.marketstatus}</h4>
                </div>
                <a onClick={() => addCart(item._id)}><IoCartOutline className='i' /></a>
              </div>
            ))
          }
        </div>
      </section> */}

      <Footer />

      <ToastContainer />
    </div>
  )
}

export default Home;
