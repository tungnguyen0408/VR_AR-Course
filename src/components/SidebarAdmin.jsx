import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShopOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./SidebarAdmin.scss";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      path: "/admin",
      icon: <DashboardOutlined />,
      title: "Tổng quan",
    },
    {
      path: "/admin/products",
      icon: <ShoppingOutlined />,
      title: "Quản lý sản phẩm",
    },
    {
      path: "/admin/categories",
      icon: <ShopOutlined />,
      title: "Quản lý danh mục",
    },
    {
      path: "/admin/customers",
      icon: <UserOutlined />,
      title: "Quản lý khách hàng",
    },
    {
      path: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      title: "Quản lý đơn hàng",
    },
  ];

  const handleLogout = () => {
    // Xử lý clear token, context, v.v. nếu cần
    navigate("/dang-nhap");
  };

  return (
    <div className="sidebar-admin">
      <div className="sidebar-header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="admin-info">
          {/* <img
            src="/avatar-admin.png"
            alt="Admin Avatar"
            className="admin-avatar"
          /> */}
          {/* <div className="admin-details">
            <div className="admin-name">Nguyễn Văn A</div>
            <div className="admin-email">admin@email.com</div>
          </div> */}
        </div>
        <h2>Trang Quản Trị</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-title">{item.title}</span>
          </NavLink>
        ))}
        {/* Mục Đăng xuất */}
        <div className="menu-item logout-item" onClick={handleLogout}>
          <span className="menu-icon">
            <LogoutOutlined />
          </span>
          <span className="menu-title">Đăng xuất</span>
        </div>
      </nav>
      <div className="sidebar-footer">
        <p>© 2024 Shop Giày</p>
      </div>
    </div>
  );
};

export default SidebarAdmin;
