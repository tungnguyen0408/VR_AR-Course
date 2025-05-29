import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SidebarFilter from "../components/SidebarFilter";
import SidebarCategory from "../components/SidebarCategory";
import Pagination from "../components/Pagination";
import "./ProductNew.scss";
import productApi from "../services/productService";
import filterService from "../services/filterService";

function ProductNew() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState({
    brand: [],
    price: 10000000,
    color: [],
    size: [],
  });
  const itemsPerPage = 9;

  const fetchProducts = async (page, currentFilters) => {
    try {
      const pageForApi = page - 1;
      let products = [];
      let total = 0;
      let pages = 1;

      // Nếu có filter được áp dụng
      if (
        currentFilters.brand.length > 0 ||
        currentFilters.color.length > 0 ||
        currentFilters.size.length > 0 ||
        currentFilters.price < 10000000
      ) {
        const filterData = {
          brands: currentFilters.brand,
          colors: currentFilters.color,
          sizes: currentFilters.size.map((size) => Number(size)),
          minPrice: 0,
          maxPrice: Number(currentFilters.price),
          sortBy: "name",
          sortDirection: "asc",
        };

        console.log("Sending filter data:", filterData);
        const response = await filterService.filterProducts(
          filterData,
          pageForApi,
          itemsPerPage
        );
        console.log("Received response:", response);

        // Xử lý response dựa trên cấu trúc thực tế
        const responseData = response?.data?.data || response?.data || response;
        if (responseData) {
          products = responseData.result || [];
          total = responseData.meta?.total || 0;
          pages = responseData.meta?.pages || 1;
        }
      } else {
        // Nếu không có filter, sử dụng API cũ
        const response = await productApi.getNewProducts(
          pageForApi,
          itemsPerPage
        );
        const responseData = response?.data?.data || response?.data || response;
        if (responseData) {
          products = responseData.result || [];
          total = responseData.meta?.total || 0;
          pages = responseData.meta?.pages || 1;
        }
      }

      setProducts(products);
      setTotalProducts(total);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="product-new-page">
      <div className="sidebar-col">
        <SidebarCategory />
        <SidebarFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="content-col">
        <ProductList
          products={products}
          totalProducts={totalProducts}
          category="Sản phẩm mới"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProductNew;
