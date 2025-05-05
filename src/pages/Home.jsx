import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SlideShow from "../components/SlideShow";
import { Link } from "react-router-dom";
import axios from "axios";
import Shop from "./Shop";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const url = `http://localhost:8080/product/get?page=1&size=10`;
  //   axios.get(url).then((response) => {
  //     setProducts(response.data.data.result);
  //   });
  // }, []);

  return (
    <div>
      <Header></Header>
      <div className="div m-3">
        <SlideShow></SlideShow>
      </div>
      <div className="div mt-5">
        <div className="product row  bg-light ms-5">
          <div className="div row">
            {products.map((item) => (
              <div key={item.id} className="col-2 me-5">
                <Link
                  to={`/product/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="image mt-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: "250px",
                        height: "214px",
                        objectFit: "cover",
                        boxSizing: "border-box",
                        border: "10px solid white",
                      }}
                    />
                  </div>
                  <div className="title pt-4">
                    <div className="div">
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          height: "70px",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>
                    <div className="div mt-3">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "25px",
                          fontStyle: "italic",
                          color: "#FF5722",
                        }}
                      >
                        <span>{item.price.toLocaleString("vi-VN")} đ</span>
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="div">
                  <button type="button" className="btn btn-danger">
                    Mua ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="div mt-5">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
