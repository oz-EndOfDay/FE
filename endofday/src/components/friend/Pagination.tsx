"use client";

import React from "react";
import {GrNext, GrPrevious} from "react-icons/gr";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                 currentPage,
                                                 totalPages,
                                                 onPageChange,
                                               }) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="inline-flex items-center space-x-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-2 py-1 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
      >
        <GrPrevious />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 ${
            page === currentPage ? "font-bold" : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
