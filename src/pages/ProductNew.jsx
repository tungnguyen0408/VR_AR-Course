import SidebarFilter from "../components/SidebarFilter";
import SidebarCategory from "../components/SidebarCategory";
import ProductList from "../components/ProductList";
import "./ProductNew.scss";
import React, { useState, useEffect } from 'react';
import productApi from '../services/productService';
import Pagination from "../components/Pagination";

function ProductNew() {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getNewProducts();
        const productsData = response?.data?.data?.result || response?.data?.result || response || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
        setTotalProduct(productsData.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Tính chỉ số để lấy sản phẩm cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Lấy danh sách sản phẩm hiện trang
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-new-page">
      <div className="sidebar-col">
        <SidebarCategory />
        <SidebarFilter />
      </div>
      <div className="content-col">
        {/* Truyền currentProducts để phân trang */}
        <ProductList category="Sản phẩm mới" products={currentProducts} totalProducts={totalProduct} />

        {/* Hiển thị phân trang khi có nhiều hơn 1 trang */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}

export default ProductNew;
