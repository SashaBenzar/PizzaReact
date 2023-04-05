import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Items = {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

interface CartState {
  totalPrice: number;
  items: Items[];
}

const initialState: CartState = {
  totalPrice: JSON.parse(localStorage.getItem('items') || '[]').reduce(
    (sum: number, obj: Items) => obj.price * obj.count + sum,
    0,
  ),
  items: JSON.parse(localStorage.getItem('items') || '[]'),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Items>) => {
      const repeatItem = state.items.find((obj) => obj.id === action.payload.id);
      if (repeatItem) {
        repeatItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    plusItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((obj) => obj.id === action.payload);
      if (item && item.count < 99) item.count++;
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((obj) => obj.id === action.payload);
      if (item && item.count > 1) item.count--;
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
  },
});

export const { addItem, deleteItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
