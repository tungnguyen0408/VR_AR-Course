import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "../config/config-axios";
import Footer from "../components/Footer";
const History = () => {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;
  useEffect(() => {
    const fetchOrder = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/order/get?filter=user.id:${userId} and status~'${status}'&sort=orderDate,desc`
          );
          setOrder(response.data.data || []);
        } catch (error) {
          console.error("Error fetching Order:", error);
        }
      }
    };
    fetchOrder();
  }, [status]);
  const changeStatus = (status) => {
    setStatus(status);
  };
  return (
    <div>
      <Header></Header>

      <div className="container mt-3 ">
        <div
          className="div w-100 d-flex bg-light align-items-center ps-5"
          style={{ height: "52px", border: "2px " }}
        >
          <button
            type="button"
            className={`btn  no-border no-background ${
              status === "" ? "bg-primary" : ""
            } `}
            onClick={() => changeStatus("")}
          >
            Tất cả
          </button>
          <button
            type="button"
            className={`btn  no-border no-background ${
              status === "da thanh toan" ? "bg-primary" : ""
            } `}
            onClick={() => changeStatus("da thanh toan")}
          >
            Đã thanh toán
          </button>
          <button
            type="button"
            className={`btn  no-border no-background ${
              status === "chua thanh toan" ? "bg-primary" : ""
            } `}
            onClick={() => changeStatus("chua thanh toan")}
          >
            Chưa thanh toán
          </button>
        </div>
        <div
          className="search d-flex bg-light mt-3 align-items-center"
          style={{ height: "50px", border: "2px " }}
        >
          <div className="div ms-3">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            className="border-0 bg-light"
            type="text"
            placeholder="Tìm kiếm theo Id hoặc tên"
          />
        </div>
        <div className="order bg-light mt-4">
          {order.map((item) => (
            <div className="div  border-red  border p-2 m-3 bg-white">
              {item.orderDetails.map((product) => (
                <div className="div mt-4 d-flex align-items-center pb-3">
                  <div
                    className="image bg-dark"
                    style={{
                      width: "200px",
                      height: "100px",
                    }}
                  >
                    <img
                      src={product.product.image_url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "auto",
                        objectfit: "cover",
                        boxsizing: "border-box",
                        //border: "10px solid white ",
                        background: "light",
                      }}
                    />
                  </div>
                  <div className="info bg-white">
                    <div className="div" style={{ width: "300px" }}>
                      <p>{product.product.name}</p>
                    </div>
                    <div className="div">
                      <span>Size: {product.size}</span>
                    </div>
                  </div>
                  <div className="div ms-5">
                    <span style={{ color: "#FF5722" }}>
                      {product.product.price.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
              ))}

              <div
                className="div mt-5  "
                style={{
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#FF5722",
                }}
              >
                <span>Thành tiền: {item.total.toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default History;
