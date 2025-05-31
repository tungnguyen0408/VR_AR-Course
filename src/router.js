import { ROUTER } from "./utils/router";
import Home from "./pages/Home";
import MenShoes from "./pages/MenShoes";
import MasterLayout from "./pages/masterLayout";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import WomenShoes from "./pages/WomenShoes";
import ProductDetail from "./pages/ProductDetail";
import BestSeller from "./pages/BestSeller";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import ProductNew from "./pages/ProductNew";
import Discover from "./pages/Discover";
import ProductByType from "./pages/ProductByType";
import Checkout from "./pages/Checkout";
import AR from "./pages/AR";
import Dashboard from "./pages/admin/Dashboard";
import ManagementProduct from "./pages/admin/ManagementProduct";
import ManagementCategory from "./pages/admin/ManagementCategory";
import ManagementOrder from "./pages/admin/ManagementOrder";
import ManagementCustomer from "./pages/admin/ManagementCustomer";

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/dang-nhap-tai-khoan" replace />;
  }

  return children;
};

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTER.USER.HOME,
      component: <Home />,
    },
    {
      path: ROUTER.USER.PRODUCT_NEW,
      component: <ProductNew />,
    },
    {
      path: ROUTER.USER.MALE,
      component: <MenShoes />,
    },
    {
      path: ROUTER.USER.FEMALE,
      component: <WomenShoes />,
    },
    {
      path: ROUTER.USER.PRODUCT_DETAIL,
      component: <ProductDetail />,
    },
    {
      path: ROUTER.USER.BEST_SELLER,
      component: <ProductByType type="bestseller" />,
    },
    {
      path: ROUTER.USER.SHOPPING_CART,
      component: <Cart />,
    },
    {
      path: ROUTER.USER.SHOP_DETAIL,
      component: <Shop />,
    },
    {
      path: ROUTER.USER.ACCOUNT,
      component: <Account />,
    },
    {
      path: ROUTER.USER.CONTACT,
      component: <Contact />,
    },
    {
      path: ROUTER.USER.DISCOVER,
      component: <Discover />,
    },
    {
      path: ROUTER.USER.LOGIN_ACCOUNT,
      component: <Login />,
    },
    {
      path: ROUTER.USER.REGISTER_ACCOUNT,
      component: <Register />,
    },
    {
      path: ROUTER.USER.HISTORY_PURCHASE,
      component: <History />,
    },
    {
      path: ROUTER.USER.PRODUCT_DETAIL,
      component: <ProductDetail />,
    },
    {
      path: ROUTER.USER.DISCOUNTED,
      component: <ProductByType type="discounted" />,
    },
    {
      path: ROUTER.USER.ALL_PRODUCT,
      component: <ProductByType type="all" />,
    },
    {
      path: ROUTER.USER.ORDER,
      component: <Checkout />,
    },
    {
      path: ROUTER.USER.AR,
      component: <AR />,
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component}></Route>
        ))}
      </Routes>
    </MasterLayout>
  );
};

const renderAdminRouter = () => {
  const adminRouters = [
    {
      path: ROUTER.ADMIN.DASHBOARD,
      component: <Dashboard></Dashboard>,
    },
    {
      path: ROUTER.ADMIN.PRODUCTS,
      component: <ManagementProduct></ManagementProduct>,
    },
    {
      path: ROUTER.ADMIN.CATEGORIES,
      component: <ManagementCategory></ManagementCategory>,
    },
    {
      path: ROUTER.ADMIN.ORDERS,
      component: <ManagementOrder></ManagementOrder>,
    },
    {
      path: ROUTER.ADMIN.CUSTOMERS,
      component: <ManagementCustomer></ManagementCustomer>,
    },
  ];

  return (
    <ProtectedAdminRoute>
      <Routes>
        {adminRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component}></Route>
        ))}
      </Routes>
    </ProtectedAdminRoute>
  );
};

const RouterCustom = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) {
    return renderAdminRouter();
  }
  return renderUserRouter();
};

export default RouterCustom;
