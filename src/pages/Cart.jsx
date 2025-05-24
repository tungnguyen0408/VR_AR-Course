import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/ContextUser";
import axios from "../config/config-axios";
import cartService from "../services/cartService";
import './Cart.scss';

const Cart = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchCart = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    if (userId) {
      try {
        const response = await cartService.getByUser(userId);
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };
  fetchCart();
}, []);


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
    
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);

    try {
      await cartService.update(updatedProducts[index].id, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteCart = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (confirmDelete) {
      try {
      await cartService.delete(id);

        setProducts(products.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleCheckout = () => {
    navigate("/dat-hang", { state: { selectedProducts } });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng</h1>
        
        {products.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="cart-header-item product">Product</div>
              <div className="cart-header-item price">Price</div>
              <div className="cart-header-item quantity">Quantity</div>
              <div className="cart-header-item total">Total</div>
              <div className="cart-header-item action">Action</div>
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
                    <img src={item.product.image_url} alt={item.product.name} />
                    <div className="product-info">
                      <h3>{item.product.name}</h3>
                      <p className="size">Size: {item.size}</p>
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
                  <span>Selected Items:</span>
                  <span>{selectedProducts.length}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>{calculateTotal().toLocaleString("vi-VN")} đ</span>
                </div>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={selectedProducts.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng!.</p>
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
