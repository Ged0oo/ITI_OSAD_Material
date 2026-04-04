import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="hover-lift mt-3 rounded-xl border border-sky-100 bg-white/80 px-6 py-6 text-center text-slate-500 transition-all duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-sky-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-sky-600">
            About
          </Link>
          <Link to="/products" className="hover:text-sky-600">
            Products
          </Link>
          <Link to="/cart" className="hover:text-sky-600">
            Cart
          </Link>
        </div>
        <p className="text-sm">Copyright © 2026 ITI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
