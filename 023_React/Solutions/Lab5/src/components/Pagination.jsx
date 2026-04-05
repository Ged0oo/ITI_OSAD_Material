import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-700 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-100"
      >
        ← Prev
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`rounded-lg px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200
            ${
              num === currentPage
                ? "bg-primary-600 font-bold text-white"
                : "border border-neutral-300 bg-neutral-100 text-neutral-800 hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100"
            }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-700 transition-all duration-200 hover:border-primary-300 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-100"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
