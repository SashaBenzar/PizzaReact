import React from 'react';
import { FilterState } from '../redux/slices/filterSlice';

type CategoriesProps = { activeIndex: FilterState; setActiveIndex: (index: number) => void };

export const Categories: React.FC<CategoriesProps> = ({ activeIndex, setActiveIndex }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item: string, index: number) => (
          <li
            onClick={() => setActiveIndex(index)}
            key={index}
            className={activeIndex.index == index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
