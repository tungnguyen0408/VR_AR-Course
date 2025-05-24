import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import SidebarFilter from '../components/SidebarFilter';
import SidebarCategory from '../components/SidebarCategory';
import Pagination from '../components/Pagination';
import './ProductNew.scss';
import productApi from '../services/productService';

function WomenShoes() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch both female and unisex products
        const [femaleProducts, unisexProducts] = await Promise.all([
          productApi.getByGender('FEMALE'),
          productApi.getByGender('UNISEX')
        ]);

        // Combine and process the products
        const femaleData = femaleProducts?.result || femaleProducts?.data?.result || femaleProducts || [];
        const unisexData = unisexProducts?.result || unisexProducts?.data?.result || unisexProducts || [];
        
        // Combine both arrays and ensure they are arrays
        const combinedProducts = [
          ...(Array.isArray(femaleData) ? femaleData : []),
          ...(Array.isArray(unisexData) ? unisexData : [])
        ];

        setProducts(combinedProducts);
        setTotalPages(Math.ceil(combinedProducts.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setTotalPages(1);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="product-new-page">
      <div className="sidebar-col">
        <SidebarCategory />
        <SidebarFilter />
      </div>
      <div className="content-col">
        <ProductList category="Giày Nữ" products={currentProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default WomenShoes; 