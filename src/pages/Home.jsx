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

        const resBestSellers = await productService.getBestSellers();
        setBestSellers(resBestSellers.data?.data?.result);
        console.log(resBestSellers.data?.data?.result);

        const resDiscounted = await productService.getDiscounted();
        setDiscounted(resDiscounted.data?.data?.result);
        console.log(resDiscounted.data);

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
        <h3>Top Sản Phẩm Bán Chạy</h3>
        <ProductList products={bestSellers} category="Bán chạy" />
      </div>

      <div className="container my-4">
        <h3>Top Sản Phẩm Giảm Giá</h3>
        <ProductList products={discounted} category="Giảm giá" />
      </div>

      
    </div>
  );
};

export default Home;
