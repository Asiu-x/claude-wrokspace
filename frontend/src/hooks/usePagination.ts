import { useState, useCallback } from 'react';

interface UsePaginationOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

export interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
  skip: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const {
    defaultPage = 1,
    defaultPageSize = 10,
    onPageChange,
  } = options;

  const [current, setCurrent] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [total, setTotal] = useState(0);

  const goToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, page);
      if (total > 0) {
        const maxPage = Math.ceil(total / pageSize);
        const clampedPage = Math.min(newPage, maxPage);
        setCurrent(clampedPage);
        onPageChange?.(clampedPage, pageSize);
      } else {
        setCurrent(newPage);
        onPageChange?.(newPage, pageSize);
      }
    },
    [pageSize, total, onPageChange]
  );

  const changePageSize = useCallback(
    (newSize: number) => {
      setPageSize(newSize);
      setCurrent(1);
      onPageChange?.(1, newSize);
    },
    [onPageChange]
  );

  const nextPage = useCallback(() => {
    goToPage(current + 1);
  }, [current, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(current - 1);
  }, [current, goToPage]);

  const reset = useCallback(() => {
    setCurrent(defaultPage);
    setPageSize(defaultPageSize);
  }, [defaultPage, defaultPageSize]);

  const state: PaginationState = {
    current,
    pageSize,
    total,
    skip: (current - 1) * pageSize,
    hasNext: total > current * pageSize,
    hasPrev: current > 1,
  };

  return {
    state,
    current,
    pageSize,
    total,
    goToPage,
    changePageSize,
    nextPage,
    prevPage,
    setTotal,
    reset,
  };
};
