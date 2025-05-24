import React from 'react';
import './Contact.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
function Contact() {
  return (
    <>
    <div className="contact-page">
      <div className="contact-breadcrumb">
        <span>Trang chủ</span> <span style={{color:'#888'}}>&gt;</span> <span style={{color:'#e41b13'}}>Liên hệ</span>
      </div>
      <h1 className="contact-title">LIÊN HỆ</h1>
      <div className="contact-main">
        <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.527263888839!2d105.8134923154022!3d21.01121239378916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3c7e2b1e6d%3A0x6e7e2e2e2e2e2e2e!2zMjY2IMSQLiDEkMO0aSBD4bqjbiwgTGlldSBHaWFpLCBCYSDEkGnhu4duLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1680000000000!5m2!1svi!2s"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-info-form">
          <div className="contact-info">
            <div className="info-item"><i className="fa fa-map-marker" style={{marginRight:8}}></i> Trần Phú - Mộ Lao - Hà Đông - Hà Nội</div>
            <div className="info-item"><i className="fa fa-phone" style={{marginRight:8}}></i> 1900 6750</div>
            <div className="info-item"><i className="fa fa-envelope" style={{marginRight:8}}></i> support@sapo.vn</div>
          </div>
          <form className="contact-form">
            <h3>Liên hệ với chúng tôi</h3>
            <input type="text" placeholder="Họ và Tên" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Nội dung" rows={4} required />
            <button type="submit">Gửi ngay</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact; 