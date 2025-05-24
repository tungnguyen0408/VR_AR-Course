import React, { useState } from "react";
import Header from "../components/Header";
import axios from "../config/config-axios";
import Footer from "../components/Footer";
const Account = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [username, setUsername] = useState(user.username);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);

  const userUpdate = {
    id: user.id,
    username: username,
    phone: phone,
    address: address,
  };
  const updateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/user/update",
        userUpdate
      );
      localStorage.setItem("user", JSON.stringify(response.data.data));
      window.alert("Đã lưu thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header></Header>
      <div
        className="container mt-5 bg-light   "
        style={{ marginLeft: "500px", width: "400px" }}
      >
        <div className="div pt-3">
          <p>Hồ Sơ Của Tôi</p>
        </div>
        <div className="border-red mt-5 d-flex">
          <label
            htmlFor="username"
            className="form-label"
            style={{ width: "100px" }}
          >
            Tài khoản
          </label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "150px" }}
          />
        </div>
        <div className="border-red mt-5 d-flex">
          <label
            htmlFor="username"
            className="form-label"
            style={{ width: "100px" }}
          >
            Email
          </label>
          <span>{user.email}</span>
        </div>
        <div className="border-red mt-5 d-flex">
          <label
            htmlFor="username"
            className="form-label"
            style={{ width: "120px" }}
          >
            Số điện thoại
          </label>
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "150px" }}
          />
        </div>
        <div className="border-red mt-5 d-flex">
          <label
            htmlFor="username"
            className="form-label"
            style={{ width: "120px" }}
          >
            Địa chỉ
          </label>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "500px" }}
          />
        </div>
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => updateUser()}
          >
            Lưu
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Account;
