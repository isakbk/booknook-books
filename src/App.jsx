import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Authors from "./pages/Authors";
import Author from "./pages/Author";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/authors"
          element={<Authors />}
        />

        <Route
          path="/author/:slug"
          element={<Author />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Footer />

      <Toast />
    </div>
  );
}