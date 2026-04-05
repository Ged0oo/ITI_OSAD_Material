import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  const { trans, toggleLanguage, rtl } = useContext(LanguageContext);

  return (
    <header
      dir={rtl ? "rtl" : "ltr"}
      className="hover-lift flex items-center justify-between rounded-xl bg-neutral-900 px-6 py-4 text-neutral-100 shadow transition-all duration-300"
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
          className="cursor-pointer rounded-md border border-primary-300 bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700 outline-none transition-all duration-200 hover:border-primary-500 focus:ring-2 focus:ring-primary-300"
        >
          <option className="bg-white text-neutral-700">English</option>
          <option className="bg-white text-neutral-700">العربية</option>
        </select>

        <Link
          to="/about"
          className="transition-colors duration-300 hover:text-secondary-400"
        >
          {trans.about}
        </Link>

        <Link
          to="/products"
          className="transition-colors duration-300 hover:text-secondary-400"
        >
          {trans.products}
        </Link>

        <Link
          to="/contactus"
          className="transition-colors duration-300 hover:text-secondary-400"
        >
          {trans.contactus}
        </Link>

        <Link
          to="/cart"
          className="relative transition-colors duration-300 hover:text-secondary-400"
        >
          🛒 {trans.cart}
          {cartCount > 0 && (
            <span className="absolute -right-4 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/"
          className="transition-colors duration-300 hover:text-secondary-400"
        >
          {trans.home}
        </Link>

        <Link
          to="/register"
          className="transition-colors duration-300 hover:text-secondary-400"
        >
          {trans.register}
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
