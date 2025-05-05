import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import axios from "../config/config-axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/ContextUser";
import Footer from "../components/Footer";
const Cart = () => {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // Lưu các sản phẩm được chọn
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/cart/get/${user.id}`
          );
          setProduct(response.data.data || []);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchCart();
  }, [user]);

  // Hàm xử lý khi thay đổi checkbox
  const handleCheckboxChange = (item) => {
    const isSelected = selectedProducts.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (isSelected) {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedProducts((prevSelected) => [...prevSelected, item]);
    }
  };
  // Hàm tăng số lượng
  const up = (index) => {
    const updatedProducts = [...product];
    updatedProducts[index].quantity += 1;
    setProduct(updatedProducts);
  };
  // Hàm giảm số lượng
  const down = (index) => {
    const updatedProducts = [...product];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setProduct(updatedProducts);
    }
  };
  // Xóa sản phẩm trong giỏ hàng
  const deleteCart = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/cart/delete/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Chuyển đến trang thanh toán với các sản phẩm đã chọn
  const handleCheckout = () => {
    navigate("/dat-hang", { state: { selectedProducts } });
  };
  return (
    <div>
      <Header />
      <div className="container mt-3">
        <div
          className="row ms-5 d-flex justify-content-center align-items-center bg-light"
          style={{ height: "50px" }}
        >
          <div className="div col-5 ps-5">Sản phẩm</div>
          <div className="div col-2">Giá</div>
          <div className="div col-2">Số lượng</div>
          <div className="div col-2">Tổng</div>
          <div className="div col-1">Thao tác</div>
        </div>

        {product.length > 0 ? (
          product.map((item, index) => (
            <div
              key={index}
              className="row ms-5 d-flex justify-content-center align-items-center bg-light mt-4"
            >
              <div className="row col-5 align-items-center">
                <div className="div col-8 d-flex align-items-center">
                  <div className="div">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={() => handleCheckboxChange(item)} // Cập nhật khi thay đổi checkbox
                      checked={selectedProducts.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                    />
                  </div>
                  <div className="div ms-4 d-flex align-items-center">
                    <div className="div mt-2 mb-2">
                      <img
                        src={item.product.image_url}
                        alt=""
                        style={{ width: "120px", height: "120px" }}
                      />
                    </div>
                    <div className="div ms-3" style={{ width: "150px" }}>
                      <p>{item.product.name}</p>
                    </div>
                  </div>
                </div>
                <div className="div col-2">Size: {item.size}</div>
              </div>
              <div className="div col-2">
                {item.product.price.toLocaleString("vi-VN")} đ
              </div>
              <div className="div col-2">
                <div className="div ms-2 d-flex">
                  <button
                    className="btn btn-light"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => down(index)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <div
                    className="div justify-content-center align-items-center p-2 ps-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "white",
                      border: "1px",
                    }}
                  >
                    <span>{item.quantity}</span>
                  </div>

                  <button
                    className="btn btn-light"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => up(index)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="div col-2">
                {(item.product.price * item.quantity).toLocaleString("vi-VN")} đ
              </div>
              <div className="div col-1">
                <button
                  className="border-0 bg-transparent ms-1"
                  onClick={() => deleteCart(item.id)}
                >
                  <i className="fa-solid fa-trash-can fa-lg"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4" style={{ marginLeft: "600px", fontSize: "24px" }}>
            Giỏ hàng trống
          </p>
        )}

        {/* Nút chuyển đến trang thanh toán */}
        <button
          className="btn btn-primary mt-5"
          onClick={handleCheckout}
          disabled={selectedProducts.length === 0}
          hidden={product.length === 0}
          style={{ marginLeft: "600px" }}
        >
          Thanh toán
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Cart;
