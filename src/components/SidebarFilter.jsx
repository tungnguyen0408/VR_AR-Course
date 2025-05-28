import React, { useState } from "react";
import "./SidebarFilter.scss";

// Dữ liệu cứng cho brands, sizes và colors
const brands = ["Adidas", "Nike", "My Shoes", "NewBlance"];
const colors = [
  { value: "Tím", hex: "#e040fb" },
  { value: "Hồng", hex: "#ff4081" },
  { value: "Vàng", hex: "#ffd600" },
  { value: "Đỏ", hex: "#ff3d00" },
  { value: "Đen", hex: "#424242" },
  { value: "Cam", hex: "#ff9100" },
  { value: "Xanh dương", hex: "#2979ff" },
  { value: "Xanh lá", hex: "#00e676" },
];
const sizes = [
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44,
];

function Chevron({ open }) {
  return (
    <span className={`filter-arrow${open ? " open" : ""}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        style={{ display: "block" }}
      >
        <polyline
          points="6 8 10 12 14 8"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SidebarFilter({ onFilterChange = () => {} }) {
  const [filters, setFilters] = useState({
    brand: [],
    price: 10000000,
    color: [],
    size: [],
  });
  const [open, setOpen] = useState({
    brand: true,
    price: true,
    color: true,
    size: true,
  });

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      const newFilters = { ...prev, [key]: updated };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handlePriceChange = (value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, price: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleColorChange = (color) => {
    setFilters((prev) => {
      const updated = prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color];
      const newFilters = { ...prev, color: updated };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSizeChange = (size) => {
    setFilters((prev) => {
      const updated = prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size];
      const newFilters = { ...prev, size: updated };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="sidebar-filter">
      <h2 className="filter-title">BỘ LỌC</h2>

      {/* Brand Filter */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle("brand")}>
          <span>THƯƠNG HIỆU</span> <Chevron open={open.brand} />
        </div>
        {open.brand &&
          brands.map((brand) => (
            <label key={brand} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleCheckboxChange("brand", brand)}
              />{" "}
              {brand}
            </label>
          ))}
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle("price")}>
          <span>GIÁ SẢN PHẨM</span> <Chevron open={open.price} />
        </div>
        {open.price && (
          <>
            <input
              type="range"
              min={0}
              max={10000000}
              value={filters.price}
              onChange={(e) => handlePriceChange(+e.target.value)}
              className="range-input"
            />
            <div>{filters.price.toLocaleString()} đ</div>
          </>
        )}
      </div>

      {/* Color Filter */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle("color")}>
          <span>MÀU SẮC</span> <Chevron open={open.color} />
        </div>
        {open.color && (
          <div className="filter-colors">
            {colors.map((color) => (
              <span
                key={color.value}
                className={`filter-color ${
                  filters.color.includes(color.value) ? "selected" : ""
                }`}
                style={{
                  background: color.hex,
                  border: filters.color.includes(color.value)
                    ? "1px solid #000"
                    : "none",
                  boxShadow: filters.color.includes(color.value)
                    ? "0 0 0 1px #fff"
                    : "none",
                }}
                onClick={() => handleColorChange(color.value)}
              ></span>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle("size")}>
          <span>KÍCH CỠ</span> <Chevron open={open.size} />
        </div>
        {open.size && (
          <div className="filter-sizes">
            {sizes.map((size) => (
              <span
                key={size}
                className={`filter-size ${
                  filters.size.includes(size) ? "selected" : ""
                }`}
                onClick={() => handleSizeChange(size)}
                style={{
                  border: filters.size.includes(size)
                    ? "2px solid #000"
                    : "1px solid #ddd",
                  backgroundColor: filters.size.includes(size)
                    ? "#000"
                    : "#fff",
                  color: filters.size.includes(size) ? "#fff" : "#000",
                }}
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarFilter;
