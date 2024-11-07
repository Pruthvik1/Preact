import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";

export const store = configureStore({
 reducer: {
  auth: authSlice.reducer,
 },
});

// Type the Redux store's RootState (this gives the shape of the state)
export type RootState = ReturnType<typeof store.getState>;

// Type the dispatch function for useDispatch
export type AppDispatch = typeof store.dispatch;
