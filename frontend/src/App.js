import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import Home from './pages/User/Home';
import Category from './pages/Admin/category/Category';
import Adminroute from './Privates/Adminroute';
import Product from './pages/User/Product';
import Contact from './pages/User/Contact';
import About from './pages/User/About';
import Cart from './pages/User/Cart';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Assets/css/style.css'
import AdminProducts from './pages/Admin/product/AdminProducts';
import Order from './pages/Admin/order/Order';
import Profile from './pages/User/Profile';
import SingleProdct from './pages/User/SingleProdct';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/productView/:id' element={<SingleProdct />} />
        <Route path='/profile' element={<Profile />} />

        <Route element={<Adminroute />}>
          <Route path='/category' element={<Category />} />
          <Route path='/Adminproduct' element={<AdminProducts />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/order' element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
