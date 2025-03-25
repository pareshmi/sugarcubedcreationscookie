import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import LoginSignup from "./Pages/LoginSignup";
import Admindash from "./Components/Dashboard/Admindash";
import Main from "./Pages/Main";
import Offers from "./Pages/Offers";
import Footer from "./Components/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/shop" element={<Shop />} />

          <Route path="/offers" element={<Offers />} />
          <Route
            path="/ourstory"
            element={<ShopCategory category="ourstory" />}
          ></Route>
          <Route
            path="/blog"
            element={<ShopCategory category="blog" />}
          ></Route>
          <Route path="/product" element={<product />}></Route>
          <Route path=":productId" element={<product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/loginsignup" element={<LoginSignup />}></Route>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/admin" element={<Admindash />} />
          <Route path="/search" element={<search />}></Route>
          <Route path="/product/:productId" element={<ProductDetails />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
