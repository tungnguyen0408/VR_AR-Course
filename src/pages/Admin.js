import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ROUTER } from "../utils/router";

const AdminDashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Tổng số sản phẩm</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Tổng số đơn hàng</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Tổng số người dùng</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
    </div>
  </div>
);

const AdminProducts = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
    {/* Thêm nội dung quản lý sản phẩm ở đây */}
  </div>
);

const AdminOrders = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
    {/* Thêm nội dung quản lý đơn hàng ở đây */}
  </div>
);

const AdminUsers = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
    {/* Thêm nội dung quản lý người dùng ở đây */}
  </div>
);

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link
            to={ROUTER.ADMIN.DASHBOARD}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            to={ROUTER.ADMIN.PRODUCTS}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Sản phẩm
          </Link>
          <Link
            to={ROUTER.ADMIN.ORDERS}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Đơn hàng
          </Link>
          <Link
            to={ROUTER.ADMIN.USERS}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Người dùng
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
