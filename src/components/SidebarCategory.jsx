import React, { useState } from "react";
import './SidebarCategory.scss';

const categories = [
  { name: "Tất cả sản phẩm", count: 40 },
  { name: "Sản phẩm mới", count: 14, active: true },
  { name: "Sản phẩm khuyến mãi", count: 18 },
  { name: "Sản phẩm nổi bật", count: 19 },
  { name: "Giày dép Nam", count: 16 },
  { name: "Giày dép Nữ", count: 27 },
  {
    name: "Crown UK",
    count: 11,
    children: ["Crown UK 1", "Crown UK 2"],
  },
  { name: "New Balance", count: 9 },
  { name: "Fresh Foam", count: 7 },
  { name: "My Shoes", count: 11 },
  { name: "Phụ kiện", count: 8 },
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
  const handleToggle = (name) => {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  return (
    <div className="sidebar-category">
      <h2 className="sidebar-title">DANH MỤC</h2>
      <ul className="sidebar-list">
        {categories.map((cat, idx) => (
          <li
            key={cat.name}
            className={`sidebar-item${cat.active ? " active" : ""}`}
          >
            <div
              className="sidebar-link"
              onClick={() => cat.children && handleToggle(cat.name)}
              style={{ cursor: cat.children ? "pointer" : "default" }}
            >
              <span>{cat.name}</span>
              <span style={{ color: cat.active ? "#e41b13" : "#888", marginLeft: 6 }}>
                ({cat.count})
              </span>
              {cat.children && (
                <Chevron open={open[cat.name]} />
              )}
            </div>
            {cat.children && open[cat.name] && (
              <ul className="sidebar-sublist">
                {cat.children.map((sub, i) => (
                  <li key={sub} className="sidebar-subitem">{sub}</li>
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