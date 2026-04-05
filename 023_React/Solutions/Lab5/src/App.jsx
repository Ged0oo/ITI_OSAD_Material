import React, { Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const ProductsList = React.lazy(() => import("./pages/ProductsList"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const Register = React.lazy(() => import("./pages/Register"));

const Navbar = React.lazy(() => import("./components/Navbar"));
const Footer = React.lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <Suspense fallback={<div className="text-neutral-600">Loading...</div>}>
      <BrowserRouter>
        <LanguageProvider>
          <Navbar />

          <main className="min-h-screen rounded-2xl bg-neutral p-6 text-neutral-800 shadow-sm ring-1 ring-neutral-200">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </LanguageProvider>
      </BrowserRouter>
    </Suspense>
  );
}
