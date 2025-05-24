import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import './Register.scss';

const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email,
      phone: phone,
    };

    try {
      const response = await userService.create(user);
      if (response.status === 200) {
        window.alert("Đăng kí thành công");
        navigate("/dang-nhap-tai-khoan");
      } 
    } catch (error) {
      console.error("Lỗi:", error);
      window.alert("that bai");
    }
  };

  return (
    <div className="register-page">
      <div className="register-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="register-form-container">
        <div className="register-breadcrumb">
          <span>Trang chủ</span> <span className="sep">›</span> <span className="active">Đăng ký tài khoản</span>
        </div>
        <h2 className="register-title">ĐĂNG KÝ TÀI KHOẢN</h2>
        <div className="register-desc">
          <b>Bạn chưa có tài khoản, vui lòng đăng ký</b>
          <p>
            Hãy điền chính xác các thông tin dưới đây để đảm bảo nhận đầy đủ mọi quyền lợi, thông tin ưu đãi dành riêng cho bạn.
          </p>
        </div>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-row">
            <div className="register-field">
              <label>Họ & tên</label>
              <input
                className="form-control"
                type="text"
                placeholder="Họ & tên"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="register-field">
              <label>Số điện thoại</label>
             <input
              className="form-control"
              type="text"
              placeholder="Số điện thoại"
              onChange={(e) => setPhone(e.target.value)}
            />
            </div>
          </div>
          <div className="register-row">
            <div className="register-field" style={{width: "100%"}}>
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="register-row">
            <div className="register-field" style={{width: "100%"}}>
              <label>Mật khẩu</label>
              <input
                className="form-control"
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="register-actions">
            <button className="btn btn-danger register-btn" type="submit">
              <i className="fa fa-pen-to-square" style={{marginRight: 8}}></i>
              Đăng ký ngay
            </button>
            <span className="register-login-link">
              Đã có tài khoản đăng nhập <Link to="/dang-nhap">tại đây</Link>
            </span>
          </div>
        </form>
        <div className="register-or">Hoặc đăng nhập bằng</div>
        <div className="register-socials">
          <button className="register-social-btn facebook">
            <i className="fa fa-facebook"></i> Facebook
          </button>
          <button className="register-social-btn google">
            <i className="fa fa-google-plus"></i> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
