import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import './Login.scss';

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    try {
      const response = await authService.login(user);

      if (response.status === 200) {
        const userData = response.data.data;
        
        // Set admin role for username "nguyenbach"
        if (username === "nguyenbach") {
          userData.role = "admin";
        }
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Check user role and redirect accordingly
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectPath);
        }

        window.location.reload();
      } else {
        window.alert("Đăng nhập thất bại");
      }
    } catch (error) {
      window.alert("Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-form-container">
        <div className="login-breadcrumb">
          <span>Trang chủ</span> <span className="sep">›</span> <span className="active">Đăng nhập tài khoản</span>
        </div>
        <h2 className="login-title">ĐĂNG NHẬP TÀI KHOẢN</h2>
        <div className="login-desc">
          <b>Bạn đã có tài khoản, vui lòng đăng nhập</b>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-field">
            <input
              className="form-control"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-actions">
            <button type="submit" className="btn btn-danger login-btn">
              <i className="fa fa-sign-in" style={{marginRight: 8}}></i>
              Đăng nhập ngay
            </button>
            <span className="login-register-link">
              Chưa có tài khoản, hãy <Link to="/dang-ky-tai-khoan">Đăng ký</Link>
            </span>
          </div>
        </form>
        <div className="login-or">Hoặc đăng nhập bằng</div>
        <div className="login-socials">
          <button className="login-social-btn facebook">
            <i className="fa fa-facebook"></i> Facebook
          </button>
          <button className="login-social-btn google">
            <i className="fa fa-google-plus"></i> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
