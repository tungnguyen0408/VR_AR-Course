import React from "react";
import { memo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      <div style={{ paddingTop: "70px" }}>{children}</div>
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
