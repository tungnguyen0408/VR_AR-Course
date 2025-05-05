import React from "react";
import Slider from "react-slick";
//import "./SlideShow.css"; // Tùy chọn: Để thêm các kiểu tùy chỉnh

const SlideShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Danh sách các hình ảnh của bạn
  const images = [
    "https://www.glab.vn/storage/uploads/advert/6620ae48da9aa.jpg",
    "https://www.glab.vn/storage/uploads/advert/66f1b68a4f8c8.png",
  ];

  return (
    <div className="slide-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="slide-image"
              style={{
                width:
                  "100%" /* Đảm bảo hình ảnh chiếm toàn bộ chiều rộng của container */,
                height: "500px" /* Chiều cao của ảnh */,
                objectfit: "cover" /* Cắt ảnh nếu không vừa kích thước */,
                borderradius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
