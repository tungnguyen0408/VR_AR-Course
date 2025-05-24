import React, { useState } from 'react';
import './ProductList.scss';
import { useNavigate } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail';
import ProductCard from './ProductCard';
import SortSelect from './SortSelect';
function ProductList({ category, products, totalProducts }) {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('default');

  const handleAddToCart = (product) => {
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleViewDetail = (product) => {
    navigate(`/chi-tiet-san-pham/${product.id}`);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <div className="product-list-title">
          <h2>{category ? category.toUpperCase() : 'SẢN PHẨM'}</h2>
          <span className="product-count">({totalProducts || 0} sản phẩm)</span>
        </div>
        <div className="product-list-actions">
          <SortSelect value={sortOption} onChange={handleSortChange} />
        </div>
      </div>

      {products && products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>Không có sản phẩm nào trong danh mục này</p>
        </div>
      )}
    </div>
  );
}

export default ProductList; 