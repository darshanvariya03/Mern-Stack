import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import '../../Assets/css/Cart.css'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import { FaCircleNotch, FaTimesCircle } from 'react-icons/fa'
import { IoAtCircleSharp } from 'react-icons/io5'

const Cart = () => {

  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);


  const getCart = async () => {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth?.token}`
    }
    if (auth?.user?._id) {
      let data = await fetch(`http://localhost:8000/api/v1/cart/cartView?userId=${auth?.user?._id}`, { headers }, {
        method: 'GET',
        headers: headers
      });
      let res = await data.json();
      if (res.success) {
        setCart(res.cart);
        calculateTotal(res.cart);
      }
    }
  };

  const cartDelete = async (id) => {
    try {
      let all = await fetch(`http://localhost:8000/api/v1/cart/cartDelete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });
      let res = await all.json();
      // console.log(res);
      if (res.success) {
        alert(res.message);
        getCart();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const calculateTotal = (cartItems) => {
    let total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(total);
  };

  const cartUpdate = async (cartId, qty) => {
    let data = await fetch(`http://localhost:8000/api/v1/cart/cartUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`
      },
      body: JSON.stringify({ cartId, qty })
    });

    let res = await data.json();
    if (res.success) {
      let updatedCart = cart.map(item => item._id === cartId ? { ...item, qty } : item);
      setCart(updatedCart);
      calculateTotal(updatedCart);
    }
  };

  const clearCart = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/v1/cart/cartClear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        }
      });

      let res = await response.json();
      if (res.success) {
        setCart([]);
        setTotal(0);
        alert('Cart Complately Cleared')
        navigate('/home')
      } else {
        alert("Failed to clear the cart");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while clearing the cart");
    }
  };
  // console.log();

  const handleCheckout = async () => {
    try {
      let response = await fetch(`http://localhost:8000/api/v1/order/orderAdd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`
        },
        body: JSON.stringify({ userId : auth.user._id, cartItems: cart, total })
      }); 

      let res = await response.json();
      if (res.success) {
        alert('Order placed successfully');
        setCart([]);
        setTotal(0);
        navigate('/home');
      } 
    } catch (err) {
      console.error(err);
      alert('An error occurred while placing the order');
    }
  };


  useEffect(() => {
    getCart();
  }, [auth?.token]);

  return (
    <div>
      <Header />
      <div>
        <section id="page-header" className="blog-header">
          <h2>#Cart</h2>
          <p>Add your coupon code & save up to 70%!</p>
        </section>

        <section id="cart" className="section-p1">
          <div align="end" className='my-2'>
            <button className='btn btn-white' onClick={clearCart}><FaTimesCircle className=' mb-1' /> Clear Cart</button>
          </div>
          <table width="100%">
            <thead>
              <tr>
                <td>Remove</td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td><button className='btn' href onClick={(e) => cartDelete(item._id)}>< FaTimesCircle /></button></td>
                  <td><img src={item.image} alt="" /></td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => cartUpdate(item._id, (e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="cart-add" className="section-p1">
          <div id="subtotal">
            <h3>Cart Totals</h3>
            <table>
              <tbody>
                <tr>
                  <td>Card-Subtotal</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>${total.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
            <button className="btn normal" onClick={handleCheckout}>Proceed to checkout</button>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
