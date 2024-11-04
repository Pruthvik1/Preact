import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "../fetatures/todoSlice";

export const store = configureStore({
 reducer: todoSlice.reducer,
});
