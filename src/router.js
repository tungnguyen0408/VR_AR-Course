import { ROUTER } from "./utils/router";
import Home from "./pages/Home";
import MenShoes from "./pages/MenShoes";
import MasterLayout from "./pages/masterLayout";
import { Route, Routes } from "react-router-dom";
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
      component: <BestSeller />,
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

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
