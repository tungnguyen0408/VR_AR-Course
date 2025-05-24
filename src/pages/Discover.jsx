import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productApi from '../services/productService';
import ProductCard from '../components/ProductCard';
import "../pages/Discover.scss";

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    gender: '',
    priceRange: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productApi.getAll();
        let filteredProducts = response.data;

        // Apply search filter
        if (searchTerm) {
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply gender filter
        if (filters.gender) {
          filteredProducts = filteredProducts.filter(product => 
            product.gender === filters.gender
          );
        }

        // Apply price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          filteredProducts = filteredProducts.filter(product => 
            product.price >= min && product.price <= max
          );
        }

        // Apply sorting
        switch (filters.sortBy) {
          case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          default:
            break;
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchTerm, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="discover-page">
      {/* Hero Section */}
      <div className="discover-hero">
        <h1>Khám phá phong cách của bạn</h1>
        <p>Tìm những phụ kiện phù hợp nhất với bạn cùng với Myshoes</p>
      </div>

      {/* Search and Filter Section */}
      <div className="discover-controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for shoes..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <div className="filters">
          <select 
            value={filters.gender} 
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả giới tính</option>
            <option value="male">Đàn ông</option>
            <option value="female">Phụ nữ</option>
          </select>

          <select 
            value={filters.priceRange} 
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả các mức giá</option>
            <option value="0-100">Dưới 500.000đ</option>
            <option value="100-200">500.000đ - 1000.000đ</option>
            <option value="200-300">1000.000đ - 3000.000đ</option>
            <option value="300-1000">Trên 3000.000đ</option>
          </select>

          <select 
            value={filters.sortBy} 
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá: Từ thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="discover-results">
        {loading ? (
          <div className="loading-spinner">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h2>Tìm thấy {products.length} sản phẩm</h2>
            </div>
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-results">
                  <i className="fa-solid fa-search"></i>
                  <h3>Không có sản phẩm nào được tìm thấy</h3>
                  <p>Điều chỉnh giá trị để tiếp tục tìm kiếm sản phẩm</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;