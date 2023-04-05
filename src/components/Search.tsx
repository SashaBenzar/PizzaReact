import React from 'react';
import { setSearch } from '../redux/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

export const Search: React.FC = () => {
  const { search } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  return (
    <input
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearch(e.target.value))}
      type="text"
      placeholder="Search"
    />
  );
};
