import React from 'react'
import Header from '../../components/Header'
import '../../Assets/css/Cart.css'
import Footer from '../../components/Footer'

const Contact = () => {
  return (
    <div>
      <Header />
      <div>
        <section id="page-header" className="blog-header">
          <h2>#KnowUs</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </section>
        <section id="about-head" className="section-p1">
          <img src="https://i.postimg.cc/y8RYK3mk/a6.jpg" alt />
          <div>
            <h2>Who We Are?</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt sequi maxime illo reprehenderit doloremque non quasi eos architecto quis enim. Commodi dignissimos hic provident vitae minima quae, omnis quam error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate temporibus voluptates, accusantium inventore ex necessitatibus pariatur quis maiores voluptatem labore impedit laudantium nesciunt expedita atque odio soluta. Assumenda, et perferendis.</p>
            <abbr title>Create a stunning images with as much or as little control as you like thanks to a choice of Basic and Creative modes.</abbr>
            <br /><br />
            <marquee bgcolor="#ccc" loop={5} scroll-amount={5}>Create a stunning images with as much or as little control as you like thanks to a choice of Basic and Creative modes.</marquee>
          </div>
        </section>
      </div>

      <Footer />

    </div >
  )
}

export default Contact