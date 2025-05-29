import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/ContextUser";
import cartService from "../services/cartService";
import './Cart.scss';

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return;

      try {
        const response = await cartService.getByUser(user.id);
        if (response.data.status === 200) {
          setCartItems(response.data.data.items || []);
        } else {
          console.error("Error fetching cart:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      }
    };

    fetchCart();
  }, [user]);

  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (isSelected) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await cartService.update(itemId, { quantity: newQuantity });
      if (response.data.status === 200) {
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        alert(response.data.message || "Không thể cập nhật số lượng");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Không thể cập nhật số lượng. Vui lòng thử lại sau.");
      }
    }
  };

  const deleteCartItem = async (itemId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (confirmDelete) {
      try {
        console.log("Attempting to delete item with ID:", itemId);
        const response = await cartService.deleteItem(itemId);
        console.log("Delete API response:", response);

        if (response.data.status === 200) {
          console.log("Item deleted successfully.");
          setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
          setSelectedItems(prevSelected => prevSelected.filter(item => item.id !== itemId));
          console.log("Cart items and selected items states updated.");
        } else {
          console.error("Error response from delete API:", response.data.message);
          alert(response.data.message || "Không thể xóa sản phẩm");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Không thể xóa sản phẩm. Vui lòng thử lại sau.");
        }
      }
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }
    navigate("/dat-hang", { state: { selectedItems } });
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (!user?.id) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <h2>Vui lòng đăng nhập</h2>
            <p>Bạn cần đăng nhập để xem giỏ hàng của mình!</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/dang-nhap')}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng</h1>
        
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="cart-header-item product">Sản phẩm</div>
              <div className="cart-header-item price">Giá</div>
              <div className="cart-header-item quantity">Số lượng</div>
              <div className="cart-header-item total">Tổng</div>
              <div className="cart-header-item action">Thao tác</div>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-product">
                    <input
                      type="checkbox"
                      className="cart-checkbox"
                      checked={selectedItems.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <img src={item.product.imageUrls?.[0]} alt={item.product.name} />
                    <div className="product-info">
                      <h3>{item.product.name}</h3>
                      <p className="size">Size: {item.productVariant.size}</p>
                      <p className="color">Màu: {item.productVariant.color}</p>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    {item.product.price.toLocaleString("vi-VN")} đ
                  </div>

                  <div className="cart-item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>

                  <div className="cart-item-total">
                    {(item.product.price * item.quantity).toLocaleString("vi-VN")} đ
                  </div>

                  <div className="cart-item-action">
                    <button 
                      className="delete-btn"
                      onClick={() => deleteCartItem(item.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-details">
                <div className="summary-row">
                  <span>Sản phẩm đã chọn:</span>
                  <span>{selectedItems.length}</span>
                </div>
                <div className="summary-row total">
                  <span>Tổng tiền:</span>
                  <span>{calculateTotal().toLocaleString("vi-VN")} đ</span>
                </div>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
              >
                Thanh toán
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng!</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              Tiếp tục mua hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
