import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Shop = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="store-info bg-light p-5 rounded">
              <h1 className="text-center mb-4">Thông Tin Cửa Hàng</h1>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="store-image mb-4">
                    <img 
                      src="./images/logo.png" 
                      alt="Cửa hàng của chúng tôi" 
                      className="img-fluid rounded"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="store-details">
                    <h3 className="mb-3">Về Chúng Tôi</h3>
                    <p className="mb-4">
                      Chào mừng đến với cửa hàng của chúng tôi! Chúng tôi tự hào là địa chỉ tin cậy 
                      cung cấp các sản phẩm chất lượng cao với giá cả phải chăng.
                    </p>
                    
                    <h3 className="mb-3">Thông Tin Liên Hệ</h3>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-phone me-2"></i>
                        Điện thoại: (028) 1234 5678
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-envelope me-2"></i>
                        Email: contact@store.com
                      </li>
                      <li className="mb-2">
                        <i className="fas fa-clock me-2"></i>
                        Giờ mở cửa: 8:00 - 22:00 (Tất cả các ngày trong tuần)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-12">
                  <h3 className="mb-3">Cam Kết Của Chúng Tôi</h3>
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="fas fa-medal fa-3x mb-3 text-primary"></i>
                          <h5 className="card-title">Chất Lượng</h5>
                          <p className="card-text">Cam kết cung cấp sản phẩm chất lượng cao, đảm bảo an toàn cho người sử dụng.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="fas fa-truck fa-3x mb-3 text-success"></i>
                          <h5 className="card-title">Giao Hàng</h5>
                          <p className="card-text">Giao hàng nhanh chóng, đúng hẹn trên toàn quốc với chi phí hợp lý.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="fas fa-headset fa-3x mb-3 text-warning"></i>
                          <h5 className="card-title">Hỗ Trợ</h5>
                          <p className="card-text">Đội ngũ tư vấn nhiệt tình, chuyên nghiệp, sẵn sàng hỗ trợ 24/7.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
