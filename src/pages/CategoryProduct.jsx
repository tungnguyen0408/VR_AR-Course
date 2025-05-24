import React from "react";
import { useParams } from "react-router-dom";
import SidebarCategory from "../components/SidebarCategory";
import SidebarFilter from "../components/SidebarFilter";
import ProductList from "../components/ProductList";

function CategoryProducts() {
  const { category } = useParams(); 

  const getCategoryName = (slug) => {
    switch (slug) {
      case "tat-ca": return "Tất cả sản phẩm";
      case "moi": return "Sản phẩm mới";
      case "khuyen-mai": return "Sản phẩm khuyến mãi";
      case "noi-bat": return "Sản phẩm nổi bật";
      case "san-pham-nam": return "Giày dép Nam";
      case "san-pham-nu": return "Giày dép Nữ";
      case "phu-kien": return "Phụ kiện";
      default: return "Sản phẩm";
    }
  };

  return (
    <div className="product-new-page">
      <div className="sidebar-col">
        <SidebarCategory />
        <SidebarFilter />
      </div>
      <div className="content-col">
        <ProductList category={getCategoryName(category)} />
      </div>
    </div>
  );
}

export default CategoryProducts;
