import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SidebarFilter from '../components/SidebarFilter';
import SidebarCategory from '../components/SidebarCategory';
import Pagination from '../components/Pagination';
import './ProductNew.scss';
import productApi from '../services/productService';

function MenShoes() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Bắt đầu từ 1
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 9; // Số sản phẩm trên mỗi trang

  const fetchProducts = async (page) => {
    try {
      const pageForApi = page - 1;
      let products = [];
      let total = 0;
      let pages = 1;
        const [maleProducts, unisexProducts] = await Promise.all([
          productApi.getByGender('MALE', pageForApi, itemsPerPage),
          productApi.getByGender('UNISEX', 0, itemsPerPage)
        ]);
        console.log(maleProducts);
        products = [
          ...(maleProducts?.data?.data.result || []),
          ...(unisexProducts?.data?.data?.result || [])
        ].slice(0, itemsPerPage);
        total = (maleProducts?.data?.data?.meta?.total || 0) + (unisexProducts?.data?.data?.meta?.total || 0);
        // Tổng số trang dựa trên tổng sản phẩm
        console.log(total);
        pages = Math.ceil(total / itemsPerPage); 
      setProducts(products);
      setTotalProducts(total);
      setTotalPages(pages);
      console.log(totalProducts)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]); 

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  return (
  
    <div className="product-new-page">
      <div className="sidebar-col">
        <SidebarCategory />
        <SidebarFilter />
      </div>
      <div className="content-col">
        <ProductList products={products} totalProducts={totalProducts} category="Giày Nam" />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default MenShoes;
