import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, Pizza, PizzaSkeleton, Pagination } from '../components/_All';

import {
  setPaginationIndex,
  setActiveIndex,
  setSortIndex,
  setAcsIndex,
} from '../redux/slices/filterSlice';
import { fetchPizza, Items } from '../redux/slices/pizzaSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const sort = ['rating', 'price', 'title'];
const asc = ['desc', 'asc'];

export const Home: React.FC = () => {
  const sortType = useAppSelector((state) => state.filter);
  const { items, status } = useAppSelector((state) => state.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const pag = `limit=4&page=${sortType.paginationIndex + 1}`;
    const category = sortType.index;
    const order = `order=${asc[sortType.asc]}`;
    const sortBy = `sortBy=${sort[sortType.sort]}`;

    const queryString = qs.stringify({
      category: sortType.index,
      sortBy: sortType.sort,
      order: sortType.asc,
    });
    navigate(`?${queryString}`);

    dispatch(fetchPizza({ category, sortBy, order, pag }));
    window.scrollTo(0, 0);
  }, [sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={sortType}
          setActiveIndex={(index: number) => dispatch(setActiveIndex(index))}
        />
        <Sort
          sort="sort"
          sortType={sortType}
          setSortType={(index: number) => dispatch(setSortIndex(index))}
          type={['популярности', 'цене', 'алфавиту']}
        />
        <Sort
          sort="asc"
          sortType={sortType}
          setSortType={(index: number) => dispatch(setAcsIndex(index))}
          type={['По убыванию', 'По возростанию']}
          text={false}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status == 'loading' ? (
          [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />)
        ) : status == 'succeeded' ? (
          items.map((item: Items) => <Pizza key={item.id} {...item} />)
        ) : (
          <h1>Error :(</h1>
        )}
      </div>
      <Pagination
        pagination={sortType.paginationIndex}
        setPagination={(index: number) => dispatch(setPaginationIndex(index))}
        pages={3}
      />
    </div>
  );
};
