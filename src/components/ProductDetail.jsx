import React, { useState } from "react";
import { useParams } from "react-router-dom";
import giay1 from '../assets/giay1.jpg';
import giay2 from '../assets/giay2.jpg';
import './ProductDetail.scss';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: 1,
    name: "Giày Fresh Foam 02",
    price: 590000,
    brand: "New Balance",
    category: "Giày thể thao",
    shortDesc: "Đôi giày siêu nhẹ, êm ái cho mọi hoạt động thể thao.",
    colors: ["#555", "#e41b13", "#2196f3", "#ff9800", "#fff", "#6d6d6d"],
    sizes: [38, 39, 40, 41, 42, 43],
    images: [giay1, giay2, giay1, giay2, giay1],
    features: [
      "Đế Fresh Foam siêu nhẹ",
      "Chất liệu mesh thoáng khí",
      "Lót giày êm ái",
      "Phù hợp cho chạy bộ và tập luyện"
    ],
    reviews: [
      {
        id: 1,
        user: "Nguyễn Văn A",
        rating: 5,
        date: "15/03/2024",
        content: "Giày rất đẹp và thoải mái. Đi chạy bộ rất êm chân."
      },
      {
        id: 2,
        user: "Trần Thị B",
        rating: 4,
        date: "10/03/2024",
        content: "Chất lượng tốt, thiết kế đẹp. Hơi chật một chút so với size thường."
      }
    ]
  },
  // ... các sản phẩm khác nếu muốn
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  // State cho các lựa chọn
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm ${product.name} - Màu: ${selectedColor} - Size: ${selectedSize} vào giỏ hàng!`);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Add review submission logic here
    console.log({ rating, review });
  };

  return (
    <>
      <Header></Header>
      <div className="product-detail-container">
        <h2 className="product-detail-title">Chi tiết sản phẩm</h2>
        <div className="product-main">
          {/* Hình ảnh sản phẩm */}
          <div className="product-images">
            <img src={mainImage} alt={product.name} className="main-image" />
            <div className="image-thumbnails">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="thumbnail"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
          {/* Thông tin sản phẩm */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-meta">
              <span>Brand: {product.brand}</span> • <span>Category: {product.category}</span>
            </div>
            <div className="product-price">
              {product.price.toLocaleString()}đ
            </div>
            <div style={{marginBottom: 10}}>{product.shortDesc}</div>
            <div className="color-options">
              <span className="color-label">Color:</span>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
            <div className="size-options">
              <span className="size-label">Size:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="size-btn"
                  onClick={() => setSelectedSize(size)}
                >{size}</button>
              ))}
            </div>
            <div className="action-row">
              <div className="quantity-box">
                <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(q => q+1)}>+</button>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Mô tả sản phẩm
            </button>
            <button
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá ({product.reviews.length})
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'description' ? 'active' : ''}`}>
            <div className="product-description">
              <h3>Tính năng sản phẩm</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p>{product.shortDesc}</p>
            </div>
          </div>

          <div className={`tab-content ${activeTab === 'reviews' ? 'active' : ''}`}>
            <div className="review-form">
              <h3>Viết đánh giá</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={`star ${star <= rating ? 'active' : ''}`}
                      onClick={() => handleRatingClick(star)}
                    />
                  ))}
                </div>
                <div className="form-group">
                  <label>Nội dung đánh giá</label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Viết đánh giá của bạn tại đây..."
                  />
                </div>
                <button type="submit" className="add-to-cart-btn">
                  Gửi đánh giá
                </button>
              </form>
            </div>

            <div className="review-list">
              {product.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="user-info">
                      <div className="avatar" />
                      <span className="user-name">{review.user}</span>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={index < review.rating ? 'active' : ''}
                      />
                    ))}
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetail; 