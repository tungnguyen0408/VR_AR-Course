import React from "react";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MasterLayout = ({ children, ...props }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/dang-nhap-tai-khoan") ||
    location.pathname.includes("/dang-ky-tai-khoan");

  if (isAuthPage) {
    return <div {...props}>{children}</div>;
  }

  return (
    <div {...props}>
      <Header />
      <div style={{ paddingTop: "70px" }}>{children}</div>
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
