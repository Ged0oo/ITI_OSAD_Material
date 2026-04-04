import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../feature/cart/cartSlice";

import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const { trans, toggleLanguage, rtl } = useLanguage();

  return (
    <header
      dir={rtl ? "rtl" : "ltr"}
      className="hover-lift rounded-xl bg-slate-800 px-6 py-4 text-slate-100 shadow flex items-center justify-between transition-all duration-300"
    >
      <a href="/" className="h-8 w-8">
        <img
          src="/iti.svg"
          alt="ITI Logo"
          className="hover:scale-110 h-8 w-7 transition-transform duration-300"
        />
      </a>

      <nav className="flex gap-6 text-sm font-medium items-center">
        <select
          onChange={toggleLanguage}
          className="bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1.5 rounded-md text-sm font-medium outline-none cursor-pointer hover:border-sky-400 focus:ring-2 focus:ring-sky-300 transition-all duration-200"
        >
          <option className="bg-white text-slate-700">English</option>
          <option className="bg-white text-slate-700">العربية</option>
        </select>
        <Link
          to="/"
          className="hover:text-green-500 transition-colors duration-300"
        >
          {trans.home}
        </Link>
        <Link
          to="/about"
          className="hover:text-green-500 transition-colors duration-300"
        >
          {trans.about}
        </Link>
        <Link
          to="/products"
          className="hover:text-green-500 transition-colors duration-300"
        >
          {trans.products}
        </Link>
        <Link
          to="/cart"
          className="relative hover:text-green-500 transition-colors duration-300"
        >
          🛒 {trans.cart}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
