import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="border border-slate-200 rounded-3xl p-4 shadow-lg hover:shadow-md transition-all bg-white/90">
      <Link to={`/products/${product.id}`} className="block group">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute top-2 left-2 bg-rose-400 text-white text-xs px-2 py-1 rounded">
            -{product.discountPercentage}%
          </span>
        </div>

        <h3 className="text-lg font-semibold mt-3 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-slate-500">
          {product.brand} • {product.category}
        </p>

        <div className="flex items-center mt-1 text-amber-500 text-sm">
          ⭐ {product.rating}
        </div>

        <div className="mt-2">
          <span className="text-lg font-bold text-teal-600">
            ${discountedPrice}
          </span>
          <span className="text-sm text-slate-400 line-through ml-2">
            ${product.price}
          </span>
        </div>
      </Link>

      <button
        onClick={() => onAddToCart(product)}
        className="mt-3 w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
