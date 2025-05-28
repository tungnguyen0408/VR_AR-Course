import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarCategory.scss";

const categories = [
  { name: "Tất cả sản phẩm", count: 40, path: "tat-ca-san-pham" },
  { name: "Sản phẩm mới", count: 14, path: "san-pham-moi" },
  { name: "Sản phẩm khuyến mãi", count: 18, path: "san-pham-ban-chay" },
  // { name: "Sản phẩm nổi bật", count: 19, path: "noi-bat" },
  { name: "Giày dép Nam", count: 16, path: "san-pham-nam" },
  { name: "Giày dép Nữ", count: 27, path: "san-pham-nu" },
  // { name: "Phụ kiện", count: 8, path: "phu-kien" },
];

function SidebarCategory() {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    if (cat.path) {
      navigate(`/${cat.path}`);
    }
  };

  return (
    <div className="sidebar-category">
      <h2 className="sidebar-title">DANH MỤC</h2>
      <ul className="sidebar-list">
        {categories.map((cat) => (
          <li
            key={cat.name}
            className="sidebar-item"
            onClick={() => handleClick(cat)}
            style={{ cursor: "pointer" }}
          >
            <div className="sidebar-link">
              <span>{cat.name}</span>
              <span style={{ marginLeft: 6, color: "#888" }}>
                ({cat.count})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarCategory;
