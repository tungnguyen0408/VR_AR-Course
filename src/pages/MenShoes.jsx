import React from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarFilter from '../components/SidebarFilter';
import SidebarCategory from '../components/SidebarCategory';
import './ProductNew.scss';

function MenShoes() {
  return (
    <>
      <Header />
      <div className="product-new-page">
        <div className="sidebar-col">
          <SidebarCategory />
          <SidebarFilter />
        </div>
        <div className="content-col">
          <ProductList category="Giày Nam" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MenShoes; 