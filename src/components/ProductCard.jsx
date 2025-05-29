import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import { UserContext } from "../utils/ContextUser";
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user, updateCartNumber } = useContext(UserContext);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!user?.id) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      navigate('/dang-nhap-tai-khoan');
      return;
    }

    if (!product.productVariants || product.productVariants.length === 0) {
        alert("Sản phẩm không có biến thể nào để thêm vào giỏ hàng.");
        return;
    }

    const firstVariant = product.productVariants[0];
    const productVariantId = firstVariant.id;
    const quantity = 1;

    try {
      const response = await cartService.create({
        userId: user.id,
        productVariantId: productVariantId,
        quantity: quantity
      });

      if (response.data.status === 200) {
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        if (updateCartNumber) {
            updateCartNumber();
        }
      } else {
        alert(response.data.message || 'Không thể thêm sản phẩm vào giỏ hàng.');
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
       const errorMessage = error.response?.data?.message || "Không thể thêm sản phẩm vào giỏ hàng.";
      alert(errorMessage);
    }
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
            type="button"
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