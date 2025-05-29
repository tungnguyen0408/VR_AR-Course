import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import productApi from "../services/productService";
import filterService from "../services/filterService";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import "../pages/Discover.scss";

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({
    brands: [],
    gender: "",
    minPrice: 0,
    maxPrice: 10000000,
    isBestseller: false,
    isNew: false,
    isFeatured: false,
    sortBy: "name",
    sortDirection: "asc",
    sizes: [],
    colors: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const pageForApi = currentPage - 1;
        let response;

        if (searchTerm) {
          response = await productApi.search(searchTerm);
        } else {
          const filterData = {
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            gender: filters.gender || undefined,
            sortBy: filters.sortBy,
            sortDirection: filters.sortDirection,
            brands: filters.brands,
            sizes: filters.sizes,
            colors: filters.colors,
            isBestseller: filters.isBestseller || undefined,
            isNew: filters.isNew || undefined,
            isFeatured: filters.isFeatured || undefined
          };

          if (filters.isBestseller) {
            filterData.sortBy = "sales";
            filterData.sortDirection = "desc";
          } else if (filters.isNew) {
            filterData.sortBy = "createdAt";
            filterData.sortDirection = "desc";
          }

          console.log("Sending filter data:", filterData);
          response = await filterService.filterProducts(filterData, pageForApi, itemsPerPage);
        }

        const responseData = response?.data?.data || response?.data || response;
        if (responseData) {
          setProducts(responseData.result || []);
          setTotalProducts(responseData.meta?.total || 0);
          setTotalPages(responseData.meta?.pages || 1);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm, filters, currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
      setCurrentPage(1);
      try {
        const response = await productApi.search(searchTerm.trim());
        if (response?.data) {
          setProducts(response.data || []);
          setTotalProducts(response.data.length || 0);
          setTotalPages(Math.ceil(response.data.length / itemsPerPage) || 1);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      }
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <div className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearchParams({ q: e.target.value });
              setCurrentPage(1);
            }}
            placeholder="Tìm giày phù hợp với bạn..."
            className="search-input"
          />
        </div>

        <div className="filters">
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange("gender", e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả giới tính</option>
            <option value="MALE">Đàn ông</option>
            <option value="FEMALE">Phụ nữ</option>
            <option value="UNISEX">Unisex</option>
          </select>

          <select
            value={`${filters.minPrice}-${filters.maxPrice}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-").map(Number);
              handleFilterChange("minPrice", min);
              handleFilterChange("maxPrice", max);
            }}
            className="filter-select"
          >
            <option value="0-10000000">Tất cả các mức giá</option>
            <option value="0-500000">Dưới 500.000đ</option>
            <option value="500000-1000000">500.000đ - 1.000.000đ</option>
            <option value="1000000-3000000">1.000.000đ - 3.000.000đ</option>
            <option value="3000000-10000000">Trên 3.000.000đ</option>
          </select>

          <select
            value={`${filters.sortBy}-${filters.sortDirection}`}
            onChange={(e) => {
              const [sortBy, sortDirection] = e.target.value.split("-");
              handleFilterChange("sortBy", sortBy);
              handleFilterChange("sortDirection", sortDirection);
            }}
            className="filter-select"
            disabled={filters.isBestseller || filters.isNew}
          >
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
            <option value="price-asc">Giá: Từ thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="createdAt-desc">Mới nhất</option>
          </select>

          <div className="special-filters">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.isBestseller}
                onChange={(e) => handleFilterChange("isBestseller", e.target.checked)}
              />
              Bán chạy
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.isNew}
                onChange={(e) => handleFilterChange("isNew", e.target.checked)}
              />
              Sản phẩm mới
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.isFeatured}
                onChange={(e) => handleFilterChange("isFeatured", e.target.checked)}
              />
              Nổi bật
            </label>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="discover-results">
        <div className="results-header">
          <h2>Tìm thấy {totalProducts} sản phẩm</h2>
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Discover;
