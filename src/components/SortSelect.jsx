import React from "react";

function SortSelect({ value, onChange }) {
  return (
    <>
      <label htmlFor="sort-select" style={{ fontWeight: 500, marginRight: 8 }}>
        Sắp xếp theo:
      </label>
      <select
        id="sort-select"
        className="sort-select"
        value={value}
        onChange={onChange}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 16,
        }}
      >
        <option value="default">Mặc định</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
        <option value="az">Từ A-Z</option>
        <option value="za">Từ Z-A</option>
        <option value="new-old">Mới đến cũ</option>
        <option value="old-new">Cũ đến mới</option>
      </select>
    </>
  );
}

export default SortSelect;