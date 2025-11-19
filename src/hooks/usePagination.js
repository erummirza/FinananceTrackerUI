// components/Pagination.js


// hooks/usePagination.js
import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1, initialPageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback((pageNumber) => {
    setCurrentPage(Math.max(1, pageNumber));
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const firstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const lastPage = useCallback((totalPages) => {
    setCurrentPage(totalPages);
  }, []);

  const changePageSize = useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  }, []);

  return {
    currentPage,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    changePageSize
  };
};