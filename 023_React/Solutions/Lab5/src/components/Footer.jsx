import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="hover-lift mt-3 rounded-xl border border-neutral-200 bg-white/90 px-6 py-6 text-center text-neutral-600 transition-all duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-4 text-sm">
          <Link
            to="/"
            className="transition-colors duration-200 hover:text-primary-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="transition-colors duration-200 hover:text-primary-600"
          >
            About
          </Link>
          <Link
            to="/products"
            className="transition-colors duration-200 hover:text-primary-600"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="transition-colors duration-200 hover:text-primary-600"
          >
            Cart
          </Link>
        </div>
        <p className="text-sm">Copyright © 2026 ITI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
