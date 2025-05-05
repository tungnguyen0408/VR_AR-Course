import React from "react";
import SidebarFilter from "../components/SidebarFilter";
import SidebarCategory from "../components/SidebarCategory";
import ProductList from "../components/ProductList";
import "./ProductNew.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProductNew() {
  return (
    <>
    <Header />
    <div className="product-new-page">
      <div className="sidebar-col">
      <SidebarCategory />
      <SidebarFilter />  
      </div>
      <div className="content-col">
        <ProductList />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ProductNew;
