import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";
import { UserContext } from "../utils/ContextUser";
import { SearchContext } from "../utils/SearchContext";
import "./Header.scss";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { setSearchTerm } = useContext(SearchContext);
  const { user, number } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLogin(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("access_token");
    setIsLogin(false);
    navigate("/dang-nhap-tai-khoan");
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchTerm(searchInput);
      navigate(`/kham-pha?q=${encodeURIComponent(searchInput)}`);
      setShowSearch(false);
      setSearchInput("");
    }
  };

  const handleSearchClick = () => {
    navigate("/kham-pha");
  };

  return (
    <div
      className="main-header"
      style={{
        background: "#e41b13",
        width: "100%",
        minHeight: "70px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #c41a12",
      }}
    >
      {/* Logo bên trái */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 40,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: 6,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            MYSHOES
          </span>
        </Link>
      </div>
      {/* Menu giữa */}
      <div style={{ flex: 3, display: "flex", justifyContent: "center" }}>
        <ul
          style={{
            background: "#fff",
            borderRadius: 2,
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            gap: 0,
            margin: 0,
            listStyle: "none",
            height: "50px",
          }}
        >
          <li style={{ padding: "0 14px" }}>
            <Link
              to="/san-pham-moi"
              style={{
                color: "#c41a12",
                fontWeight: 500,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              HÀNG MỚI
            </Link>
          </li>
          <li className="header-dropdown" style={{ padding: "0 14px" }}>
            <span
              className="header-dropdown-toggle"
              style={{ color: "#c41a12", fontWeight: 500, fontSize: 16 }}
            >
              <Link
                to="/san-pham-nam"
                style={{
                  color: "#c41a12",
                  fontWeight: 500,
                  fontSize: 16,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                NAM
              </Link>{" "}
              <span className="header-dropdown-arrow">▼</span>
            </span>
            <ul className="header-dropdown-menu">
              <li>
                <Link to="san-pham-ban-chay">Bán chạy</Link>
              </li>
              <li>
                <Link to="san-pham-giam-gia">Giảm giá</Link>
              </li>
            </ul>
          </li>
          <li className="header-dropdown" style={{ padding: "0 14px" }}>
            <span
              className="header-dropdown-toggle"
              style={{ color: "#c41a12", fontWeight: 500, fontSize: 16 }}
            >
              <Link
                to="/san-pham-nu"
                style={{
                  color: "#c41a12",
                  fontWeight: 500,
                  fontSize: 16,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                NỮ
              </Link>{" "}
              <span className="header-dropdown-arrow">▼</span>
            </span>
            <ul className="header-dropdown-menu">
              <li>
                <Link to="san-pham-ban-chay">Bán chạy</Link>
              </li>
              <li>
                <Link to="#">Nổi bật</Link>
              </li>
              <li>
                <Link to="san-pham-giam-gia">Giảm giá</Link>
              </li>
            </ul>
          </li>
          <li style={{ padding: "0 14px" }}>
            <Link
              to="/san-pham-ban-chay"
              style={{
                color: "#c41a12",
                fontWeight: 500,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              BÁN CHẠY
            </Link>
          </li>
          <li style={{ padding: "0 14px" }}>
            <Link
              to="/lien-he"
              style={{
                color: "#c41a12",
                fontWeight: 500,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              LIÊN HỆ
            </Link>
          </li>
          <li style={{ padding: "0 14px" }}>
            <Link
              to="/ar"
              style={{
                color: "#c41a12",
                fontWeight: 500,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              AR
            </Link>
          </li>
        </ul>
      </div>
      {/* Icon bên phải */}
      <div
        style={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 30,
          paddingRight: 40,
        }}
      >
        {/* Tìm kiếm */}
        <Link to="/kham-pha" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#fff", fontSize: 22 }}
            ></i>
            <span style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>
              Tìm kiếm
            </span>
          </div>
        </Link>
        {/* Giỏ hàng */}
        <Link to="/gio-hang" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "#fff", fontSize: 22 }}
            ></i>
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -10,
                background: "#fff",
                color: "#e41b13",
                borderRadius: "50%",
                fontSize: 12,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                border: "2px solid #e41b13",
              }}
            >
              {number}
            </span>
            <span style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>
              Giỏ hàng
            </span>
          </div>
        </Link>
        {/* Cửa hàng */}
        <Link to="/cua-hang" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "#fff", fontSize: 22 }}
            ></i>
            <span style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>
              Cửa hàng
            </span>
          </div>
        </Link>
        {/* Tài khoản */}
        <div
          className="nav-item dropdown"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            className="rounded"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <i
              className="fa-solid fa-user"
              style={{ color: "#fff", fontSize: 22 }}
            ></i>
          </button>
          <span style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>
            Tài khoản
          </span>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <Link className="dropdown-item" to="/tai-khoan-ca-nhan">
                Tài khoản
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/lich-su-mua-hang">
                Lịch sử mua hàng
              </Link>
            </li>
            {isLogin ? (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleLogout()}
                >
                  Đăng xuất
                </button>
              </li>
            ) : (
              <li>
                <Link className="dropdown-item" to="/dang-nhap-tai-khoan">
                  Đăng nhập
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
