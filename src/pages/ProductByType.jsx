import React, { useEffect, useState } from "react";
import productApi from "../services/productService";
import ProductList from "../components/ProductList";
import SidebarFilter from "../components/SidebarFilter";
import SidebarCategory from "../components/SidebarCategory";
import Pagination from "../components/Pagination";
import "./ProductNew.scss";

function ProductByType({ type = "all" }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 9;
  const typeLabels = {
    all: "Tất cả sản phẩm",
    discount: "Sản phẩm giảm giá",
    bestseller: "Sản phẩm bán chạy",
  };
  const fetchProducts = async (page) => {
    try {
      const pageForApi = page - 1;
      let res;
      switch (type) {
        case "discount":
          res = await productApi.getDiscounted(pageForApi, itemsPerPage);
          break;
        case "bestseller":
          res = await productApi.getBestSellers(pageForApi, itemsPerPage);
          break;
        case "all":
        default:
          res = await productApi.getAll(pageForApi, itemsPerPage);
          break;
      }

      const data = res?.data?.data?.result || [];
      const total = res?.data?.data?.meta?.total || 0;
      setProducts(data);
      setTotalProducts(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, type]);

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
        <ProductList
          products={products}
          totalProducts={totalProducts}
          category={typeLabels[type] || "Danh sách sản phẩm"}
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

export default ProductByType;
