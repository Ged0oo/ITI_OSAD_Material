import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../feature/cart/cartSlice";

function ProductCard({ product }) {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white/90 p-4 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block group">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute left-2 top-2 rounded bg-primary-500 px-2 py-1 text-xs text-white">
            -{product.discountPercentage}%
          </span>
        </div>

        <h3 className="text-lg font-semibold mt-3 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-neutral-500">
          {product.brand} • {product.category}
        </p>

        <div className="mt-1 flex items-center text-sm text-secondary-600">
          ⭐ {product.rating}
        </div>

        <div className="mt-2">
          <span className="text-lg font-bold text-secondary-700">
            ${discountedPrice}
          </span>
          <span className="ml-2 text-sm text-neutral-400 line-through">
            ${product.price}
          </span>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full rounded-lg bg-primary-600 py-2 text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 active:bg-primary-800"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
