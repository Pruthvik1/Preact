import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state
interface AuthState {
 status: boolean;
 userData: any | null; // Replace `any` with a more specific type if you know the structure of `userData`
}

const initialState: AuthState = {
 status: false,
 userData: null,
};

// Create the slice
export const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
  login: (state, action: PayloadAction<{ userData: any }>) => {
   state.status = true;
   state.userData = action.payload.userData;
  },
  logout: (state) => {
   state.status = false; // Corrected logout to set status to false
   state.userData = null;
  },
 },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
