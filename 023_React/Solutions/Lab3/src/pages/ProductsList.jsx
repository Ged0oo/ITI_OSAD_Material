import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 12;

function ProductsList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    fetch(`https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Products List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard product={product} onAddToCart={addToCart} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductsList;
