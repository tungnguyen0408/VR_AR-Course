import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/ContextUser";
import cartService from "../services/cartService";
import './Cart.scss';

const Cart = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await cartService.getByUser(user.id);
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

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

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const updatedProducts = [...products];
      updatedProducts[index].quantity = newQuantity;
      setProducts(updatedProducts);

      await cartService.update(updatedProducts[index].id, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Không thể cập nhật số lượng. Vui lòng thử lại sau.");
    }
  };

  const deleteCart = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (confirmDelete) {
      try {
        await cartService.delete(id);
        setProducts(products.filter(item => item.id !== id));
        setSelectedProducts(selectedProducts.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Không thể xóa sản phẩm. Vui lòng thử lại sau.");
      }
    }
  };

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }
    navigate("/dat-hang", { state: { selectedProducts } });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (loading) {
    return <div className="loading">Đang tải giỏ hàng...</div>;
  }

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
        
        {products.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="cart-header-item product">Sản phẩm</div>
              <div className="cart-header-item price">Giá</div>
              <div className="cart-header-item quantity">Số lượng</div>
              <div className="cart-header-item total">Tổng</div>
              <div className="cart-header-item action">Thao tác</div>
            </div>

            <div className="cart-items">
              {products.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-product">
                    <input
                      type="checkbox"
                      className="cart-checkbox"
                      checked={selectedProducts.some(
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
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
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
                      onClick={() => deleteCart(item.id)}
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
                  <span>{selectedProducts.length}</span>
                </div>
                <div className="summary-row total">
                  <span>Tổng tiền:</span>
                  <span>{calculateTotal().toLocaleString("vi-VN")} đ</span>
                </div>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={selectedProducts.length === 0}
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
