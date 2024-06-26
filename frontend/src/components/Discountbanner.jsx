import React from 'react'
import { Link } from 'react-router-dom'

const Discountbanner = () => {
    return (
        <section id="banner" className="section-m1">
            <h4> Repair Service</h4>
            <h2>Up to <span>50% off </span> - All Tshirts and Accessories</h2>
            <Link to={'/products'}> <button className="btn normal">Explore more</button></Link>
            
        </section>
    )
}

export default Discountbanner