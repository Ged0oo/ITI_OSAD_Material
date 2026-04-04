import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="hover-lift mb-3 rounded-xl border border-sky-100 bg-white/85 px-6 py-4 text-slate-700 shadow-sm backdrop-blur flex items-center justify-between transition-all duration-300">
      <Link to="/">
        <img src="/iti.svg" alt="ITI Logo" className="h-8 w-8" />
      </Link>

      <nav className="flex gap-6 text-sm font-medium items-center">
        <Link
          to="/"
          className="hover:text-sky-600 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-sky-600 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to="/products"
          className="hover:text-sky-600 transition-colors duration-300"
        >
          Products
        </Link>

        <Link
          to="/cart"
          className="relative hover:text-sky-600 transition-colors duration-300"
        >
          Cart
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
