import React from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!userData.id) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      navigate('/dang-nhap');
      return;
    }

    // Chuyển hướng đến trang chi tiết để chọn variant
    navigate(`/chi-tiet-san-pham/${product.id}`);
  };

  const handleViewDetail = () => {
    navigate(`/chi-tiet-san-pham/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetail}>
      <div className="product-image">
        <img src={product.imageUrls?.[0]} alt={product.name} />
        {product.isNew && <span className="badge new">NEW</span>}
        {product.salePrice && (
          <span className="badge sale">
            SALE
            {product.salePrice && product.price && (
              <span style={{ marginLeft: 4 }}>
                -{Math.round(100 - (product.salePrice / product.price) * 100)}%
              </span>
            )}
          </span>
        )}
        <div className="product-actions">
          <button
            className="action-btn add-cart"
            title="Thêm vào giỏ hàng"
            onClick={handleAddToCart}
          >
            <i className="fa fa-shopping-cart"></i>
          </button>
          <button
            className="action-btn view-detail"
            title="Xem chi tiết"
            onClick={handleViewDetail}
          >
            <i className="fa fa-info-circle"></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          {product.salePrice ? (
            <>
              <span className="sale-price">{product.salePrice.toLocaleString()}đ</span>
              <span className="original-price">{product.price.toLocaleString()}đ</span>
            </>
          ) : (
            <span className="price">{product.price.toLocaleString()}đ</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 