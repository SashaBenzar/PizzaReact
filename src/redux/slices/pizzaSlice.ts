import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Items = {
  id: number;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface PizzaState {
  items: Items[];
  status: string;
}

export const fetchPizza = createAsyncThunk<
  Items[],
  { category: number; sortBy: string; order: string; pag: string }
>('users/fetchPizzaStatus', async ({ category, sortBy, order, pag }) => {
  const { data } = await axios.get<Items[]>(
    `https://63f540b32213ed989c52634b.mockapi.io/items?${
      category == 0 ? '' : `category=` + category
    }&${sortBy}&${order}&${pag}`,
  );
  return data;
});

const initialState: PizzaState = { items: [], status: 'loading' };
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<Items[]>) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.items = [];
        state.status = 'failed';
      });
  },
});

export default pizzaSlice.reducer;
