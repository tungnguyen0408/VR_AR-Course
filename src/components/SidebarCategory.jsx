import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SidebarCategory.scss';

const categories = [
  { name: "Tất cả sản phẩm", count: 40, path: "tat-ca" },
  { name: "Sản phẩm mới", count: 14, path: "moi" },
  { name: "Sản phẩm khuyến mãi", count: 18, path: "khuyen-mai" },
  { name: "Sản phẩm nổi bật", count: 19, path: "noi-bat" },
  { name: "Giày dép Nam", count: 16, path: "giay-nam" },
  { name: "Giày dép Nữ", count: 27, path: "giay-nu" },
  { name: "Phụ kiện", count: 8, path: "phu-kien" }
];
function Chevron({ open }) {
  return (
    <span className={`sidebar-chevron${open ? ' open' : ''}`}>
      <svg width="14" height="14" viewBox="0 0 20 20" style={{display:'block'}}>
        <polyline
          points="6 8 10 12 14 8"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SidebarCategory() {
  const [open, setOpen] = useState({});
  const navigate = useNavigate();

  const handleToggle = (name) => {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

const handleClick = (cat) => {
  if (cat.children) {
    handleToggle(cat.name);
  } else if (cat.path) {
    navigate(`/products/${cat.path}`);
  }
};
  return (
    <div className="sidebar-category">
      <h2 className="sidebar-title">DANH MỤC</h2>
      <ul className="sidebar-list">
        {categories.map((cat) => (
          <li
            key={cat.name}
            className={`sidebar-item${cat.active ? " active" : ""}`}
          >
            <div
              className="sidebar-link"
              onClick={() => handleClick(cat)}
              style={{ cursor: cat.children || cat.path ? "pointer" : "default" }}
            >
              <span>{cat.name}</span>
              <span style={{ color: cat.active ? "#e41b13" : "#888", marginLeft: 6 }}>
                ({cat.count})
              </span>
              {cat.children && (
                <Chevron open={open[cat.name]} />
              )}
            </div>

            {/* Submenu cho children */}
            {cat.children && open[cat.name] && (
              <ul className="sidebar-sublist">
                {cat.children.map((sub) => (
                  <li
                    key={sub}
                    className="sidebar-subitem"
                    onClick={() => navigate(`${cat.path}/${sub.toLowerCase().replace(/\s+/g, '-')}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarCategory;
