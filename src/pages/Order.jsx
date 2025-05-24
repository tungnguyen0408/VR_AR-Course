import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "../config/config-axios";
import Footer from "../components/Footer";
const Order = () => {
  const navigate = useNavigate();
  let order;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userId = user ? user.id : null;
  const [orderId, setOrderId] = useState();
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("chua thanh toan");
  const [orderDate, setOrderDate] = useState("");
  useEffect(() => {
    // Lấy ngày tháng hiện tại và định dạng
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    setOrderDate(formattedDate);
  }, []);
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];
  const selectOrder = selectedProducts.map((item) => {
    const { id, ...rest } = item;
    return rest;
  });
  const productOrder = location.state?.productOrder || [];
  useEffect(() => {
    const calculateTotal = (items) => {
      return items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );
    };

    const itemsToSum =
      selectedProducts && selectedProducts.length > 0
        ? selectedProducts
        : productOrder;
    setTotal(calculateTotal(itemsToSum));
  }, []);

  useEffect(() => {
    order =
      selectedProducts && selectedProducts.length > 0
        ? {
            orderDate: orderDate,
            total: total,
            status: status,
            orderDetails: selectOrder,
            user: {
              id: userId,
            },
          }
        : {
            orderDate: orderDate,
            total: total,
            status: status,
            orderDetails: productOrder,
            user: {
              id: userId,
            },
          };
    const postOrder = async () => {
      if (total > 0) {
        try {
          const response = await axios.post(
            "http://localhost:8080/order/create",
            order
          );
          setOrderId(response.data.data.id);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    postOrder();
  }, [total]);
  const payment = async (id) => {
    if (id > 0) {
      try {
        const response = await axios.put(
          `http://localhost:8080/order/update/${id}`
        );
        setOrderId(response.data.data.id);
        window.alert("dat hang thanh cong");
        navigate("/");
        axios.post("http://localhost:8080/email/order", {
          userId: userId,
          orderId: orderId,
        });
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="container mt-3 me-5">
        <div className="div bg-light">
          <div className="div justify-content-center align-items-center d-flex">
            <span style={{ fontSize: "30px" }}>Thanh toán</span>
          </div>
          <div className="div">
            <div
              className="div d-flex align-items-center "
              style={{ gap: "8px", fontSize: "20px" }}
            >
              <i className="fa-solid fa-location-dot"></i>
              <span>Địa chỉ nhận hàng</span>
            </div>
            <div className="div mt-3">
              <p style={{ fontSize: "18px" }}>{user.address}</p>
            </div>
          </div>
        </div>
        <div className="row bg-light mt-4 d-flex align-items-center pt-3">
          <div className="div col-6">Sản phẩm</div>
          <div className="div col-2">Đơn giá</div>
          <div className="div col-1">Số lượng</div>
          <div className="div col-2 ms-5">Thành tiền</div>
        </div>
        {selectedProducts && selectedProducts.length > 0 ? (
          selectedProducts.map((item) => (
            <div className="row d-flex align-items-center bg-light ">
              <div className="div col-6 d-flex align-items-center ">
                <div className="div mt-4">
                  <img
                    src={item.product.image_url}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <div
                  className="div ms-3"
                  style={{
                    paddingLeft: "50px",
                    width: "300px",
                    fontWeight: "bold",
                  }}
                >
                  <p>{item.product.name}</p>
                </div>
                <div className="div ms-5" style={{ paddingLeft: "50px" }}>
                  <span> Size: {item.size}</span>
                </div>
              </div>
              <div className="div col-2">
                {item.product.price.toLocaleString("vi-VN")} đ
              </div>
              <div className="div col-1">{item.quantity}</div>
              <div className="div col-2 ms-5">
                {item.quantity * item.product.price}
              </div>
            </div>
          ))
        ) : (
          <div className="row d-flex align-items-center bg-light ">
            <div className="div col-6 d-flex align-items-center ">
              <div className="div mt-4">
                <img
                  src={productOrder[0].product.image_url}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="div ms-3" style={{ paddingLeft: "50px" }}>
                <p>{productOrder[0].product.name}</p>
              </div>
              <div className="div ms-5" style={{ paddingLeft: "50px" }}>
                <span> Size: {productOrder[0].size}</span>
              </div>
            </div>
            <div className="div col-2">
              {productOrder[0].product.price.toLocaleString("vi-VN")} đ
            </div>
            <div className="div col-1">{productOrder[0].quantity}</div>
            <div className="div col-2 ms-5">
              {(
                productOrder[0].quantity * productOrder[0].product.price
              ).toLocaleString("vi-VN")}{" "}
              đ
            </div>
          </div>
        )}
        <div className="div mt-5" style={{ marginLeft: "900px" }}>
          <div className="div">
            <h4>Thông tin đơn hàng</h4>
          </div>
          <div className="info">
            <div className="">
              <h5>Tổng tiền: {total.toLocaleString("vi-VN")} đ</h5>
            </div>
            <div className="div">
              <p>Phuơng thức vận chuyển: Nhanh</p>
            </div>
            <div className="div">
              <p>Phuơng thức thanh toán: Thanh toán khi nhận hàng</p>
            </div>

            <div className="pay">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => payment(orderId)}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Order;
