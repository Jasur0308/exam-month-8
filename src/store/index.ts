import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import likedReducer from './likedSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    likes: likedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
