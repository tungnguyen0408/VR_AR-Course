import React from "react";
import "./AR.scss";

const AR = () => {
  return (
    <div className="ar-page">
      <h1 className="ar-title">QUÉT MÃ QR ĐỂ XEM SẢN PHẨM TRONG AR</h1>
      <div className="ar-content">
        <div className="ar-image">
          <img
            src="images/ar_quet.png"
            alt="AR QR Code"
            className="img-fluid"
          />
        </div>
        <div className="ar-instructions">
          <h3>Hướng dẫn sử dụng:</h3>
          <ol>
            <li>Mở ứng dụng camera trên điện thoại của bạn</li>
            <li>Quét mã QR ở trên</li>
            <li>Chọn sản phẩm bạn muốn xem trong AR</li>
            <li>Dùng camera để xem sản phẩm trong không gian thực tế</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AR;
