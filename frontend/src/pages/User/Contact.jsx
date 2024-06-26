import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Contact = () => {
  return (
    <div>
      <Header />
      <div>
        <section id="page-header" className="blog-header">
          <h2>Let's_talk</h2>
          <p>LEAVE A MESSAGE. We love to hear from you!</p>
        </section>
        <section id="contact-details" className="section-p1">
          <div className="details">
            <span>GET IN TOUCH</span>
            <h2>Visit one of our agency locations or contact us today</h2>
            <h3>Head Office</h3>
            <div>
              <li>
                <i className="fal fa-map" />
                <p>56 Olowora Street Off Agbara, Ogba, Lagos State</p>
              </li>
              <li>
                <i className="far fa-envelope" />
                <p>contact@example.com</p>
              </li>
              <li>
                <i className="fas fa-phone-alt" />
                <p>Monday to Satuday: 9.00am to 6pm</p>
              </li>
              <li>
                <i className="far fa-clock" />
                <p>56 Olowora Street Off Agbara, Ogba, Lagos State</p>
              </li>
            </div>
          </div>
          <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d30020904.597640138!2d77.94389900000002!3d23.291757!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719246302631!5m2!1sen!2sin" width="600" height="450" style={{ marginRight: '10px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
        <Footer/>
      </div>

    </div>
  )
}

export default Contact