import React from 'react';
import { addItem } from '../redux/slices/cartSlice';
import { Items } from '../redux/slices/pizzaSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

export const Pizza: React.FC<Items> = ({ id, imageUrl, name, types, sizes, price }) => {
  const typesName = ['тонкое', 'традиционное'];
  const [active, setActive] = React.useState({ type: 0, size: 0 });
  const cartItem = useAppSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const dispatch = useAppDispatch();
  const addCount = cartItem ? cartItem.count : 0;

  const onAdd = () => {
    const obj = {
      id,
      imageUrl,
      name,
      type: typesName[active.type],
      size: sizes[active.size],
      price,
      count: 0,
    };
    dispatch(addItem(obj));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              className={active.type === index ? 'active' : ''}
              onClick={() => setActive({ ...active, type: index })}>
              {typesName[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={active.size === index ? 'active' : ''}
              onClick={() => setActive({ ...active, size: index })}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom" onClick={onAdd}>
        <div className="pizza-block__price">от {price} ₴</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addCount > 0 && <i>{addCount}</i>}
        </div>
      </div>
    </div>
  );
};
