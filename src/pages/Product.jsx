import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "../config/config-axios";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
const Product = () => {
  const params = useParams();
  const productId = Number(params.id);
  const navigate = useNavigate();
  const [size, setSize] = useState(27);
  const [product, setProduct] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLogin(!!token);
  }, []);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const userId = user ? user.id : null;
  useEffect(() => {
    const fetchProduct = async () => {
      if (params) {
        try {
          const response = await axios.get(
            `http://localhost:8080/product/get/${productId}`
          );
          setProduct(response.data.data || []);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchProduct();
  }, []);
  const changeSize = (size) => {
    setSize(size);
  };
  const [quantity, setQuantity] = useState(1);
  const up = () => {
    setQuantity(quantity + 1);
  };
  const down = () => {
    setQuantity(quantity - 1);
  };

  const addToCart = async () => {
    const productCurrent = {
      size: size,
      quantity: quantity,
      product: { id: productId },
      user: { id: userId },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/cart/create",
        productCurrent
      );
      window.alert("thêm thành công");
      window.location.reload();
    } catch (error) {
      window.alert("Bạn chưa có tài khoản vui lòng đăng nhập ");
      navigate("/dang-nhap");
    }
  };
  const handleCheckout = () => {
    if (isLogin) {
      navigate("/dat-hang", {
        state: {
          productOrder: [
            {
              product,
              size,
              quantity,
            },
          ],
        },
      });
    } else {
      window.alert("Vui lòng đăng nhập để mua hàng");
      localStorage.setItem("redirectAfterLogin", `/product/${productId}`);
      navigate("/dang-nhap");
    }
  };
  return (
    <div>
      <Header></Header>
      <div className="container mt-5 ">
        <div className="row">
          <div className="image col-4">
            <div className="div">
              <img
                src={product.image_url}
                alt=""
                style={{
                  width: "120%",
                  height: "120%",
                  objectfit: "cover",
                  boxsizing: "border-box",
                  border: "10px solid white ",
                }}
              />
            </div>
          </div>
          <div className="info col-6 ms-5">
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>
              {product.name}
            </p>
            <div className="div d-flex">
              <div className="div  d-flex me-3">
                <div className="div">
                  <span style={{ fontWeight: "bold" }}>4.9</span>
                </div>
                <div className="div">
                  <i class="fa-solid fa-star " style={{ color: "red" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "red" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "red" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "red" }}></i>
                  <i class="fa-solid fa-star" style={{ color: "red" }}></i>
                </div>
              </div>
              <div className="div me-3">
                <span style={{ fontWeight: "bold" }}>10 </span>
                <span>Đánh giá</span>
              </div>
              <div className="div">
                <span style={{ fontWeight: "bold" }}>1k </span>
                <span>Đã bán</span>
              </div>
            </div>
            <div className="price mt-3">
              <span
                style={{
                  fontWeight: "bold",
                  fontfamily: "Arial, sansserif",
                  fontSize: "25px",
                  fontStyle: "italic",
                  color: "#FF5722",
                }}
              >
                {(product.price * quantity).toLocaleString("vi-VN")} đ
              </span>
            </div>
            <div className="deliver d-flex">
              <div className="div me-2">
                <i class="fa-solid fa-truck"></i>
              </div>
              <div
                className="div"
                style={{
                  width: "150px",
                  height: "40px",
                }}
              >
                <span>Vận chuyển đến</span>
              </div>
              <div className="div">
                <span>{user ? user.address : "Hà Nội"}</span>
              </div>
            </div>
            <div className="size d-flex mt-5">
              <div className="div">
                <span>Size</span>
              </div>
              <div className="div row ms-5">
                {[27, 28, 29, 30, 31].map((selectedSize) => (
                  <button
                    key={selectedSize}
                    className={`btn col-2 me-2 ${
                      size === selectedSize ? "btn-primary" : "btn-secondary"
                    }`}
                    onClick={() => changeSize(selectedSize)}
                  >
                    {selectedSize}
                  </button>
                ))}
              </div>
            </div>
            <div className="quantity d-flex mt-5">
              <div className="div">
                <span>Số lượng</span>
              </div>
              <div className="div ms-5 d-flex">
                <button
                  className="btn btn-light"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => down()}
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <div
                  className="div justify-content-center align-items-center p-2 ps-3"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <span>{quantity}</span>
                </div>

                <button
                  className="btn btn-light"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => up()}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="buy d-flex mt-3">
              <div className="div ">
                <div className="div">
                  <button
                    className="btn btn-danger "
                    onClick={() => addToCart()}
                  >
                    <i class="fa-solid fa-cart-arrow-down me-1"></i>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              <div className="div ms-3">
                <button
                  className="btn btn-danger "
                  onClick={() => handleCheckout()}
                >
                  Mua ngay
                </button>
              </div>
            </div>
            <div className="prodcut mt-5 bg-light ">
              <div
                className="d-flex w-100  align-items-center"
                style={{ height: "50px" }}
              >
                <h4>Mô tả sản phẩm</h4>
              </div>
              <div className="div">
                <p>SHOP ĐẢM BẢO và CAM KẾT CHO CÁC BẠN</p>
                <p>
                  🍓 Về sản phẩm: Shop cam kết cả về chất lượng và kiểu dáng.
                  Tất cả ảnh đều không chỉnh sửa. 99% là sản phẩm đúng như ảnh
                  1% là do khách hàng quá đẹp trai, hihi.
                </p>
                <p>🍓 Dịch vụ: Hỗ trợ đổi hàng nếu các bạn đi không vừa.</p>
                <p>
                  🍓 Thời gian chuẩn bị hàng: hàng luôn có sẵn nên cứ đặt là sẽ
                  đóng gói gửi bạn ạ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Product;
