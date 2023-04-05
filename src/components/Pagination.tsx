import React from 'react';

type PaginationProps = {
  pages: number;
  pagination: number;
  setPagination: (a: number | ((b: number) => void)) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ pages = 1, pagination, setPagination }) => {
  const Move = (val: string) => {
    if (val === 'back') {
      setPagination((prev: number) => (prev > 0 ? prev - 1 : prev));
    } else if (val === 'front') {
      setPagination((prev: number) => (prev < pages - 1 ? prev + 1 : prev));
    }
  };

  return (
    <ul className="pagination">
      <li onClick={() => Move('back')}>{'<'}</li>
      {[...new Array(pages)].map((_, index) => (
        <li
          key={index}
          className={index === pagination ? '__active' : ''}
          onClick={() => setPagination(index)}>
          {index + 1}
        </li>
      ))}
      <li onClick={() => Move('front')}>{'>'}</li>
    </ul>
  );
};
