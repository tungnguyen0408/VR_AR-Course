import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../utils/ContextUser";
import "./Checkout.scss";

const Checkout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    note: "",
    paymentMethod: "COD", // COD: Cash on Delivery
    shippingMethod: "STANDARD", // STANDARD: Giao hàng tiêu chuẩn
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user?.id) {
      navigate("/dang-nhap");
      return;
    }

    if (selectedItems.length === 0) {
      navigate("/cart");
      return;
    }
  }, [user, selectedItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Vui lòng nhập họ tên";
    if (!formData.email) newErrors.email = "Vui lòng nhập email";
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.shippingMethod)
      newErrors.shippingMethod = "Vui lòng chọn phương thức vận chuyển";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/item/${cartItemId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const orderData = {
        userId: user.id,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingMethodId: formData.shippingMethod === "STANDARD" ? 1 : 2, // 1: Standard, 2: Express
        paymentMethod: formData.paymentMethod,
        notes: formData.note,
        items: selectedItems.map((item) => ({
          productId: item.product.id,
          variantId: item.productVariant.id,
          quantity: item.quantity,
          discountAmount: 0,
          taxAmount: 0,
        })),
      };

      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove items from cart after successful order
        for (const item of selectedItems) {
          await removeFromCart(item.id);
        }
        alert("Đặt hàng thành công!");
        navigate("/gio-hang");
      } else {
        alert(data.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Không thể tạo đơn hàng. Vui lòng thử lại sau.");
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Thanh toán</h1>

        <div className="checkout-content">
          <div className="checkout-form">
            <h2>Thông tin giao hàng</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label>Địa chỉ *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "error" : ""}
                  placeholder="Nhập địa chỉ đầy đủ của bạn"
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phương thức vận chuyển *</label>
                <div className="shipping-methods">
                  <label className="shipping-method">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="STANDARD"
                      checked={formData.shippingMethod === "STANDARD"}
                      onChange={handleInputChange}
                    />
                    <div className="shipping-info">
                      <div className="shipping-header">
                        <span className="shipping-name">
                          Giao hàng tiêu chuẩn
                        </span>
                        <span className="shipping-price">Miễn phí</span>
                      </div>
                      <p className="shipping-time">
                        Giao hàng trong 2-3 ngày làm việc
                      </p>
                    </div>
                  </label>
                  <label className="shipping-method">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="EXPRESS"
                      checked={formData.shippingMethod === "EXPRESS"}
                      onChange={handleInputChange}
                    />
                    <div className="shipping-info">
                      <div className="shipping-header">
                        <span className="shipping-name">Giao hàng nhanh</span>
                        <span className="shipping-price">30.000đ</span>
                      </div>
                      <p className="shipping-time">
                        Giao hàng trong 1-2 ngày làm việc
                      </p>
                    </div>
                  </label>
                </div>
                {errors.shippingMethod && (
                  <span className="error-message">{errors.shippingMethod}</span>
                )}
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                />
              </div>

              <div className="form-group">
                <label>Phương thức thanh toán *</label>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleInputChange}
                    />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="BANKING"
                      checked={formData.paymentMethod === "BANKING"}
                      onChange={handleInputChange}
                    />
                    <span>Chuyển khoản ngân hàng</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="place-order-btn">
                Đặt hàng
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Đơn hàng của bạn</h2>
            <div className="order-items">
              {selectedItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <img
                      src={item.product.imageUrls?.[0]}
                      alt={item.product.name}
                    />
                    <div>
                      <h3>{item.product.name}</h3>
                      <p>Size: {item.productVariant.size}</p>
                      <p>Màu: {item.productVariant.color}</p>
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="item-price">
                    {(item.product.price * item.quantity).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    đ
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Tạm tính:</span>
                <span>{calculateTotal().toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="total-row">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="total-row final">
                <span>Tổng cộng:</span>
                <span>{calculateTotal().toLocaleString("vi-VN")} đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
