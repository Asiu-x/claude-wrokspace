import { useState, useCallback } from 'react';

export type FilterType = 'select' | 'input' | 'date' | 'range';

export interface FilterConfig {
  label: string;
  type: FilterType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export interface FilterState {
  search: string;
  filters: Record<string, string>;
}

const matchesSearch = (item: any, search: string): boolean => {
  if (!search) return true;
  const searchable = JSON.stringify(item);
  return typeof searchable === 'string' && searchable.toLowerCase().includes(search.toLowerCase());
};

const matchesFilterValue = (itemValue: any, filterValue: string): boolean => {
  if (!itemValue) return false;
  const target = filterValue.toLowerCase();
  if (typeof itemValue === 'string') {
    return itemValue.toLowerCase().includes(target);
  }
  if (Array.isArray(itemValue)) {
    return itemValue.some((v: any) => String(v).toLowerCase().includes(target));
  }
  return String(itemValue) === String(filterValue);
};

export const useFilters = (
  initialState: Partial<FilterState> = {}
) => {
  const [searchValue, setSearchValue] = useState<string>(initialState.search || '');
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    initialState.filters || {}
  );

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setSearchValue('');
    setFilterValues({});
  }, []);

  const getFilters = useCallback(() => {
    const activeFilters = Object.entries(filterValues).filter(([_, v]) => v !== '');
    return activeFilters.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }, [filterValues]);

  const clearFilter = useCallback((key: string) => {
    setFilterValues((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const setFilters = useCallback((newFilters: Record<string, string>) => {
    setFilterValues(newFilters);
  }, []);

  const applyFilters = useCallback(
    <T>(data: T[]): T[] => {
      const activeFilters = Object.entries(getFilters());
      return data.filter((item: any) => {
        if (!matchesSearch(item, searchValue)) return false;
        return activeFilters.every(([key, value]) => matchesFilterValue(item[key], value as string));
      });
    },
    [searchValue, getFilters]
  );

  const state: FilterState = {
    search: searchValue,
    filters: filterValues,
  };

  return {
    state,
    searchValue,
    filterValues,
    handleSearch,
    handleFilterChange,
    handleReset,
    clearFilter,
    getFilters,
    setFilters,
    applyFilters,
  };
};
