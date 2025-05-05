import { Routes, Route } from "react-router-dom";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./utils/ContextUser";
import History from "./pages/History";
import Account from "./pages/Account";
import { SearchProvider } from "./utils/SearchContext";
import ProductNew from "./pages/ProductNew";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import Contact from "./pages/Contact";
import MenShoes from "./pages/MenShoes";
import WomenShoes from "./pages/WomenShoes";
import BestSeller from "./pages/BestSeller";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/dang-nhap" element={<Login></Login>} />
            <Route path="/dang-ky" element={<Register></Register>} />
            <Route path="/cua-hang" element={<Shop></Shop>} />
            <Route path="/dat-hang" element={<Order></Order>}></Route>
            <Route path="/gio-hang" element={<Cart></Cart>}></Route>
            <Route path="/product/:id" element={<Product></Product>}></Route>
            <Route path="/lich-su" element={<History></History>}></Route>
            <Route path="/tai-khoan" element={<Account></Account>}></Route>
            <Route path="/chi-tiet-san-pham/:id" element={<ProductDetail />} />
            <Route
              path="/san-pham-moi"
              element={<ProductNew></ProductNew>}
            ></Route>
            <Route
              path="/san-pham-moi"
              element={<ProductList></ProductList>}
            ></Route>
            <Route path="/lien-he" element={<Contact></Contact>}></Route>
            <Route path="/giay-nam" element={<MenShoes></MenShoes>}></Route>
            <Route path="/giay-nu" element={<WomenShoes></WomenShoes>}></Route>
            <Route path="/ban-chay" element={<BestSeller />} />
          </Routes>
        </SearchProvider>
      </UserProvider>
    </div>
  );
}

export default App;
