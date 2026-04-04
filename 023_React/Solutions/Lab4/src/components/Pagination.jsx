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
        className="px-4 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
      >
        ← Prev
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-2 rounded transition
            ${
              num === currentPage
                ? "bg-sky-300 text-white font-bold"
                : "bg-slate-200 text-slate-800 hover:bg-slate-300"
            }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
