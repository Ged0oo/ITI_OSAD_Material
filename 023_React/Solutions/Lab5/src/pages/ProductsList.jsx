import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const itemsPerPage = 12;

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;

    fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
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
      <h2 className="rounded-2xl border border-neutral-200 bg-white p-4 text-2xl font-bold text-neutral-900 shadow-sm">
        Products List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
