import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import productApi from '../services/productService';
import cartService from '../services/cartService';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);
const colorMap = {
  "Trắng": "#ffffff",
  "Đen": "#000000",
  "Đỏ": "#ff0000",
  "Xanh": "#0000ff",     
  "Vàng": "#ffff00",
  "Xám": "#808080",
  "Cam": "#ffa500",
  
};

const userData = JSON.parse(localStorage.getItem('user') || '{}');
const userId = userData.id;
const token = userData.acces_token;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(id);    
        const response = await productApi.getById(id);
        const productData = response?.data?.data;
        if (productData) {
          setProduct(productData);
          if (productData.variants && productData.variants.length > 0) {
            setSelectedColor(productData.variants[0].color);
            setSelectedSize(productData.variants[0].size);
          }
          setMainImage(productData.imageUrls?.[0] || '');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

const handleAddToCart = async () => {
  if (!userData.id) {
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
    navigate('/dang-nhap');
    return;
  }

  if (!selectedSize) {
    alert('Vui lòng chọn size');
    return;
  }

  if (!selectedColor) {
    alert('Vui lòng chọn màu sắc');
    return;
  }

  try {
    // Tìm variant tương ứng với màu và size đã chọn
    const selectedVariant = product.variants.find(
      v => v.color === selectedColor && v.size === selectedSize
    );

    if (!selectedVariant) {
      alert('Không tìm thấy biến thể sản phẩm phù hợp');
      return;
    }

    const cartItem = {
      userId: userData.id,
      productId: product.id,
      variantId: selectedVariant.id,
      quantity: quantity
    };

    await cartService.create(cartItem);
    alert(`Đã thêm ${quantity} sản phẩm ${product.name} - Màu: ${selectedColor} - Size: ${selectedSize} vào giỏ hàng!`);
  } catch (error) {
    console.error('Lỗi thêm vào giỏ hàng:', error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Thêm vào giỏ hàng thất bại, vui lòng thử lại.');
    }
  }
};

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await productApi.addReview(id, {
        rating,
        content: review
      });
      setRating(0);
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Lấy danh sách màu và size duy nhất từ variants
const getUniqueColors = () => {
  if (!product?.variants) return [];
  const uniqueSet = new Set();
  product.variants.forEach(v => {
    if (v.color) uniqueSet.add(v.color.trim());
  });
  return [...uniqueSet];
};


  const getUniqueSizes = () => {
    if (!product?.variants) return [];
    return [...new Set(product.variants.map(v => v.size))];
  };

  if (loading) {
    return <div className="loading">Đang tải thông tin sản phẩm...</div>;
  }

  if (!product) {
    return <div className="error">Không tìm thấy thông tin sản phẩm</div>;
  }

  return (
    <>
      <div className="product-detail-container">
        <h2 className="product-detail-title">Chi tiết sản phẩm</h2>
        <div className="product-main">
          {/* Hình ảnh sản phẩm */}
          <div className="product-images">
            <img src={mainImage} alt={product.name} className="main-image" />
            <div className="image-thumbnails">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                product.imageUrls.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className={`thumbnail ${img === mainImage ? 'selected' : ''}`}
                    onClick={() => setMainImage(img)}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ))
              ) : (
                <div className="no-images">Không có ảnh khác</div>
              )}
            </div>
          </div>
          {/* Thông tin sản phẩm */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-meta">
              <span>Brand: {product.brand}</span> • <span>Category: {product.categoryName}</span>
            </div>
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
            <div className="product-description" style={{marginBottom: 10}}>{product.description}</div>
            
            {/* Màu sắc */}
           <div className="color-options">
          <span className="color-label">Màu sắc:</span>
          {getUniqueColors().map((color, index) => (
            <div
              key={index}
              className={`color-swatch ${color === selectedColor ? 'selected' : ''}`}
              style={{ backgroundColor: colorMap[color] || '#ccc' }} // fallback nếu không có
              onClick={() => setSelectedColor(color)}
            />
  ))}
</div>
            {/* Size */}
            <div className="size-options">
              <span className="size-label">Size:</span>
              {getUniqueSizes().map((size) => (
                <button
                  key={size}
                  className={`size-btn ${size === selectedSize ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >{size}</button>
              ))}
            </div>
            <div className="stock-status">
              {product.stockQuantity > 0 ? (
                <span className="in-stock">Còn hàng: {product.stockQuantity}</span>
              ) : (
                <span className="out-of-stock">Hết hàng</span>
              )}
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
                disabled={product.stockQuantity === 0}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {product.stockQuantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
              </button>

            </div>

            {/* Thông tin chi tiết */}
            <div className="product-details">
              <div className="detail-item">
                <span className="label">Mã sản phẩm:</span>
                <span className="value">{product.sku}</span>
              </div>
              <div className="detail-item">
                <span className="label">Chất liệu:</span>
                <span className="value">{product.material}</span>
              </div>
              <div className="detail-item">
                <span className="label">Kích thước:</span>
                <span className="value">{product.dimensions}</span>
              </div>
              <div className="detail-item">
                <span className="label">Trọng lượng:</span>
                <span className="value">{product.weight} kg</span>
              </div>
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
              Đánh giá ({product.ratingAverage || 0})
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'description' ? 'active' : ''}`}>
            <div className="product-description">
              <h3>Mô tả chi tiết</h3>
              <p>{product.description}</p>
              <div className="meta-info">
                <h4>Thông tin SEO</h4>
                <p><strong>Meta Title:</strong> {product.metaTitle}</p>
                <p><strong>Meta Description:</strong> {product.metaDescription}</p>
                <p><strong>Meta Keywords:</strong> {product.metaKeywords}</p>
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;