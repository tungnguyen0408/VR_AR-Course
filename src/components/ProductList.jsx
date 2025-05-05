import React, { useState } from 'react';
import './ProductList.scss';
import giay1 from '../assets/giay1.jpg';
import giay2 from '../assets/giay2.jpg';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const products = [
  {
    id: 1,
    name: "Giày Fresh Foam 02",
    price: 590000,
    brand: "New Balance",
    image: giay1,
    category: "Giày Nam",
    shortDesc: "Đôi giày siêu nhẹ, êm ái cho mọi hoạt động thể thao.",
    colors: ["#555", "#e41b13", "#2196f3", "#ff9800", "#fff", "#6d6d6d"],
    sizes: [38, 39, 40, 41, 42, 43],
    images: [giay1, giay2, giay1, giay2, giay1]
  },
  {
    id: 2,
    name: "Giày Sneaker Nam Crown UK 2",
    price: 1500000,
    salePrice: 1300000,
    image: giay2,
    isNew: false,
    isSale: true,
    category: "Giày Nam",
    shortDesc: "Sneaker nam phong cách trẻ trung, năng động.",
    colors: ["#222", "#e41b13"],
    sizes: [39, 40, 41, 42],
    images: [giay2, giay1]
  },
  {
    id: 3,
    name: "Giày Thể Thao Nam Adidas Runfalcon",
    price: 1200000,
    image: giay1,
    brand: "Adidas",
    category: "Giày Nam",
    shortDesc: "Giày thể thao nam Adidas nhẹ, bền, phù hợp chạy bộ.",
    colors: ["#000", "#fff"],
    sizes: [40, 41, 42, 43],
    images: [giay1, giay2]
  },
  {
    id: 4,
    name: "Giày Lười Nam Da Bò",
    price: 950000,
    image: giay2,
    brand: "My Shoes",
    category: "Giày Nam",
    shortDesc: "Giày lười da bò cao cấp, lịch lãm cho nam giới.",
    colors: ["#6d4c41", "#222"],
    sizes: [39, 40, 41, 42, 43],
    images: [giay2, giay1]
  },
  {
    id: 5,
    name: "Giày Sneaker Nữ Crown UK 3",
    price: 1500000,
    salePrice: 1300000,
    image: giay2,
    isNew: false,
    isSale: true,
    category: "Giày Nữ",
    shortDesc: "Sneaker nữ phong cách trẻ trung, năng động.",
    colors: ["#e41b13", "#2196f3"],
    sizes: [36, 37, 38, 39],
    images: [giay2, giay1]
  },
  // Thêm nhiều sản phẩm khác ở đây
];

function ProductList({ category }) {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('default');

  // Filter products by category if prop is provided
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  const handleAddToCart = (product) => {
    // Thêm logic thêm vào giỏ hàng ở đây (ví dụ: gọi context hoặc localStorage)
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleViewDetail = (product) => {
    navigate(`/chi-tiet-san-pham/${product.id}`);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Thêm logic sắp xếp sản phẩm ở đây nếu muốn
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <div className="product-list-title">
          <h2>{category ? category.toUpperCase() : 'SẢN PHẨM MỚI'}</h2>
          <span className="product-count">({filteredProducts.length} sản phẩm)</span>
        </div>
        <div className="product-list-actions">
          <label htmlFor="sort-select" style={{ fontWeight: 500, marginRight: 8 }}>Sắp xếp theo:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortOption}
            onChange={handleSortChange}
            style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 16 }}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="az">Từ A-Z</option>
            <option value="za">Từ Z-A</option>
            <option value="new-old">Mới đến cũ</option>
            <option value="old-new">Cũ đến mới</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.isNew && <span className="badge new">NEW</span>}
              {product.isSale && (
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
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fa fa-shopping-cart"></i>
                </button>
                <button
                  className="action-btn view-detail"
                  title="Xem chi tiết"
                  onClick={() => handleViewDetail(product)}
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
        ))}
      </div>
    </div>
  );
}

export default ProductList; 