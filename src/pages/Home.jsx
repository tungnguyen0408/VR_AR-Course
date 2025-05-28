import React, { useState, useEffect } from "react";  // phải import useState và useEffect
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SlideShow from "../components/SlideShow";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import ProductCard from "../components/ProductCard";
import productService from "../services/productService";
import BrandBanner from "../components/BrandBanner";

const Home = () => {
    console.log("Home mounted");
  const [products, setProducts] = useState([]);  
  const [bestSellers, setBestSellers] = useState([]);
  const [discounted, setDiscounted] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await productService.getByGender("MALE", 0, 10);
        setProducts(resProducts.data.result || resProducts.data.data?.result || []);

        const resBestSellers = await productService.getBestSellers(0, 8);
        setBestSellers(resBestSellers.data?.data?.result || []);

        const resDiscounted = await productService.getDiscounted(0, 8);
        setDiscounted(resDiscounted.data?.data?.result || []);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="m-3">
        <SlideShow />
      </div>
      <BrandBanner /> 
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Top Sản Phẩm Bán Chạy</h3>
          <Link to="/best-sellers" className="text-decoration-none text-primary">
            Xem thêm <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <ProductList products={bestSellers} category="Bán chạy" />
      </div>

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Top Sản Phẩm Giảm Giá</h3>
          <Link to="/discounted" className="text-decoration-none text-primary">
            Xem thêm <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <ProductList products={discounted} category="Giảm giá" />
      </div>

      
    </div>
  );
};

export default Home;
