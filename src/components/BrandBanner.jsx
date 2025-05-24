import React from "react";
import "./BrandBanner.scss";
import { useNavigate } from "react-router-dom";
function BrandBanner() {
      const navigate = useNavigate();
    const banners = [
    {
      img: "/images/brand1.jpg",
      title: "Dép cói",
      label: "BRAIDED",
      brandName: "Braided"
    },
    {
      img: "./images/brand2.jpg",
      title: "ZARA",
      label: "Dép lê Zara",
      brandName: "ZARA"
    },
    {
      img: "./images/brand3.jpg",
      title: "NIKE 1980",
      label: "Chỉ với 3.999.000đ",
      brandName: "NIKE"
    },
       {
      img: "./images/brand4.jpg",
      title: "AIR JORDAN",
      label: "Chỉ với 3.999.000đ",
      brandName: "JORDAN"
    },
     {
      img: "/images/brand1.jpg",
      title: "Dép cói",
      label: "BRAIDED",
      brandName: "Braided"
    },
    {
      img: "./images/brand2.jpg",
      title: "ZARA",
      label: "Dép lê Zara",
      brandName: "ZARA"
    },
    {
      img: "./images/brand3.jpg",
      title: "NIKE 1980",
      label: "Chỉ với 3.999.000đ",
      brandName: "NIKE"
    },
       {
      img: "./images/brand4.jpg",
      title: "AIR JORDAN",
      label: "Chỉ với 3.999.000đ",
      brandName: "JORDAN"
    },
  ];

  const handleClick = (brand) => {
    navigate(`/products?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div className="brand-banner container my-4">
      <h3>Các thương hiệu sản phẩm giày</h3>
      <div className="row justify-content-center">
        {banners.map((item, idx) => (
          <div className="col-md-3 col-6 mb-3 d-flex" key={idx}>
            <div className="brand-item w-100" onClick={() => handleClick(item.brandName)} style={{ cursor: "pointer" }}>
              <img src={item.img} alt={item.title} />
              <strong>{item.title}</strong>
              <div className="brand-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>  
);
}

export default BrandBanner;
