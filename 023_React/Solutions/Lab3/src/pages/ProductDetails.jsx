import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
    <div className="p-6 grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-contain border rounded-lg"
        />
        <div className="flex gap-2 mt-4">
          {(product.images || []).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="w-20 h-20 object-contain border rounded"
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="text-slate-500 mt-1">
          {product.brand} • {product.category}
        </p>

        <div className="mt-2 text-amber-500">⭐ {product.rating}</div>

        <p className="mt-4 text-slate-700">{product.description}</p>

        <div className="mt-4">
          <span className="text-2xl font-bold text-teal-600">
            ${discountedPrice}
          </span>
          <span className="ml-3 text-slate-400 line-through">
            ${product.price}
          </span>
        </div>

        <p className="mt-2 text-sm">📦 {product.stock} items available</p>
        <p className="text-sm text-teal-600">{product.availabilityStatus}</p>

        <p className="mt-2 text-sm text-slate-500">
          🚚 {product.shippingInformation}
        </p>

        <button className="mt-6 bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition">
          Add to Cart
        </button>

        <div className="mt-6">
          <p className="text-sm text-slate-500">Scan Product</p>
          {product.meta?.qrCode ? (
            <img
              src={product.meta.qrCode}
              alt="QR Code"
              className="w-24 mt-2"
            />
          ) : (
            <p className="text-sm text-slate-400 mt-2">QR code unavailable</p>
          )}
        </div>
      </div>

      <div className="md:col-span-2 mt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {(product.reviews || []).map((review, i) => (
            <div key={i} className="border p-4 rounded-lg">
              <div className="flex justify-between">
                <p className="font-semibold">{review.reviewerName}</p>
                <span className="text-amber-500">⭐ {review.rating}</span>
              </div>
              <p className="text-slate-600 mt-1">{review.comment}</p>
            </div>
          ))}
          {(!product.reviews || product.reviews.length === 0) && (
            <p className="text-slate-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
