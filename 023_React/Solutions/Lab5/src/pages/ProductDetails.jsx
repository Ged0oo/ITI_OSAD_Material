import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../feature/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.id === undefined) {
          throw new Error("Product not found");
        }
        setProduct(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!product) {
    return null;
  }

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="grid gap-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-2">
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-80 w-full rounded-lg border border-neutral-200 object-contain"
        />
        <div className="flex gap-2 mt-4">
          {(product.images || []).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="h-20 w-20 rounded border border-neutral-200 object-contain"
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{product.title}</h1>

        <p className="mt-1 text-neutral-500">
          {product.brand} • {product.category}
        </p>

        <div className="mt-2 text-secondary-600">⭐ {product.rating}</div>

        <p className="mt-4 text-neutral-700">{product.description}</p>

        <div className="mt-4">
          <span className="text-2xl font-bold text-secondary-700">
            ${discountedPrice}
          </span>
          <span className="ml-3 text-neutral-400 line-through">
            ${product.price}
          </span>
        </div>

        <p className="mt-2 text-sm text-neutral-700">
          📦 {product.stock} items available
        </p>
        <p className="text-sm text-secondary-700">
          {product.availabilityStatus}
        </p>

        <p className="mt-2 text-sm text-neutral-500">
          🚚 {product.shippingInformation}
        </p>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-6 rounded-lg bg-primary-600 px-6 py-3 text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 active:bg-primary-800"
        >
          Add to Cart
        </button>

        <div className="mt-6">
          <p className="text-sm text-neutral-500">Scan Product</p>
          {product.meta?.qrCode ? (
            <img
              src={product.meta.qrCode}
              alt="QR Code"
              className="w-24 mt-2"
            />
          ) : (
            <p className="mt-2 text-sm text-neutral-400">QR code unavailable</p>
          )}
        </div>
      </div>

      <div className="md:col-span-2 mt-8">
        <h2 className="mb-4 text-xl font-semibold text-neutral-900">Reviews</h2>
        <div className="space-y-4">
          {(product.reviews || []).map((review, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
            >
              <div className="flex justify-between">
                <p className="font-semibold text-neutral-800">
                  {review.reviewerName}
                </p>
                <span className="text-secondary-600">⭐ {review.rating}</span>
              </div>
              <p className="mt-1 text-neutral-600">{review.comment}</p>
            </div>
          ))}
          {(!product.reviews || product.reviews.length === 0) && (
            <p className="text-neutral-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
