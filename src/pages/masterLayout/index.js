import React from "react";
import { memo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
