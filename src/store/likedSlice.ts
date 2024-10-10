import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../api/makeupApi';

interface LikedState {
  items: Product[];
}

const initialState: LikedState = {
  items: [],
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addToLikes: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeFromLikes: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearLikes: (state) => {
      state.items = [];
    },
  },
});

export const { addToLikes, removeFromLikes, clearLikes } = likesSlice.actions;
export default likesSlice.reducer;
