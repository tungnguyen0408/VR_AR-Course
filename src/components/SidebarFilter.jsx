import React, { useState } from "react";
import "./SidebarFilter.scss";

const types = ["Áo thể thao", "Dép", "Giày", "Phụ kiện"];
const brands = ["Adidas", "Crown UK", "My Shoes", "NewBlance"];
const colors = ["#e040fb", "#ff4081", "#ffd600", "#ff3d00", "#424242", "#ff9100", "#2979ff", "#00e676"];
const sizes = [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];

const FILTERS = [
  { key: 'type', label: 'LOẠI' },
  { key: 'brand', label: 'THƯƠNG HIỆU' },
  { key: 'price', label: 'GIÁ SẢN PHẨM' },
  { key: 'color', label: 'MÀU SẮC' },
  { key: 'size', label: 'KÍCH CỠ' },
];

function Chevron({ open }) {
  return (
    <span className={`filter-arrow${open ? ' open' : ''}`}>
      <svg width="16" height="16" viewBox="0 0 20 20" style={{display:'block'}}>
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

function SidebarFilter() {
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [open, setOpen] = useState({
    brand: true,
    price: true,
    color: true,
    size: true,
  });
  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="sidebar-filter">
      <h2 className="filter-title">BỘ LỌC</h2>
      {/* Thương hiệu */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle('brand')} style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>THƯƠNG HIỆU</span>
          <Chevron open={open.brand} />
        </div>
        {open.brand && brands.map(brand => (
          <label key={brand} className="filter-checkbox">
            <input type="checkbox" /> {brand}
          </label>
        ))}
      </div>
      {/* Giá sản phẩm */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle('price')} style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>GIÁ SẢN PHẨM</span>
          <Chevron open={open.price} />
        </div>
        {open.price && <>
          <div className="filter-price-range">
            <input
              type="range"
              min={0}
              max={10000000}
              value={maxPrice}
              onChange={e => setMaxPrice(+e.target.value)}
              className="range-input"
            />
          </div>
          <div className="filter-price-inputs">
            <input type="number" value={0} min={0} max={maxPrice} readOnly />
            <span>-</span>
            <input type="number" value={maxPrice} min={0} max={10000000} onChange={e => setMaxPrice(+e.target.value)} />
          </div>
          <button className="filter-price-btn">Lọc giá</button>
        </>}
      </div>
      {/* Màu sắc */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle('color')} style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>MÀU SẮC</span>
          <Chevron open={open.color} />
        </div>
        {open.color && <div className="filter-colors">
          {colors.map((color, idx) => (
            <span key={color+idx} className="filter-color" style={{background: color}}></span>
          ))}
        </div>}
      </div>
      {/* Kích cỡ */}
      <div className="filter-group">
        <div className="filter-group-title" onClick={() => toggle('size')} style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>KÍCH CỠ</span>
          <Chevron open={open.size} />
        </div>
        {open.size && <div className="filter-sizes">
          {sizes.map(size => (
            <span key={size} className="filter-size">{size}</span>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default SidebarFilter; 