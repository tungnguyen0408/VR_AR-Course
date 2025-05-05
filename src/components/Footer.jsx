import React from "react";
import "../components/Footer.css";
import anh1 from "../assets/logo-bo-cong-thuong.png";
import anh2 from "../assets/logo-VNPAY-QR.png";
const Footer = () => {
  return (
    <div>
      <div class="row footer m-3 mt-5 ">
        <div class="col-sm-3">
          <div class="items__footer">
            <p class="item__title">
              CÔNG TY CỔ PHẦN THƯƠNG MẠI ĐỨC PHỨC HOLDINGS
            </p>
            <p>
              <span>
                <b>Địa chỉ:</b> 135/58 Trần Hưng Đạo, Hà Nội
              </span>
            </p>
            <p>
              <span>
                <b>GPDK số:</b> 0312935520
              </span>
            </p>
            <p>
              <span>
                <b>Đăng ký lần đầu:</b> 19/09/2014, cấp bởi Sở Kế Hoạch Và Đầu
                Tư TP HCM - Phòng Đăng Ký Kinh Doanh.
              </span>
            </p>
            <p>
              <span>
                <b>Điện thoại:</b> 02838367123 / 0945378809
              </span>
            </p>
            <p>
              <span>
                <b>Email:</b> ducphuc@gmail.com
              </span>
            </p>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="items__footer">
            <p class="item__title">Dịch Vụ và Hỗ Trợ</p>
            <p>
              <a href=""></a>
            </p>
            <p>
              <a href="">Chính sách bảo hành</a>
            </p>
            <p>
              <a href="">Chính sách bảo mật</a>
            </p>
            <p>
              <a href="">Chính sách giao nhận</a>
            </p>
            <p>
              <a href="">Chính sách kiểm hàng, đổi trả và hoàn phí</a>
            </p>
            <p>
              <a href="">Chính sách thanh toán</a>
            </p>
            <p>
              <a href="">Chính sách ký gửi sản phẩm</a>
            </p>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="items__footer">
            <p class="item__title">Theo dõi chúng tôi</p>
            <p>
              <a href="">Facebook</a>
            </p>
            <p>
              <a href="">Instagram</a>
            </p>
            <p>
              <a href="">Youtube</a>
            </p>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="items__footer">
            <p class="item__title">Chứng nhận</p>
            <p>
              <a href="" previewlistener="true" target="_blank">
                <img width="200" src={anh1} />
              </a>
            </p>
            <p>
              <a href="" previewlistener="true" target="_blank">
                <img width="200" src={anh2} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
