import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems, postChangeCart } from "../api/cartApi";

const initState = [];

export const getCartItemsAsync = createAsyncThunk("getCartItemsAsync", () => {
  return getCartItems();
});

export const postChangeCartAsync = createAsyncThunk(
  "postChangeCartAsync",
  (param) => {
    return postChangeCart(param);
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.fulfilled, (state, aciton) => {
        console.log("getCartItemsAsync.fulfilled");
        console.log(aciton.payload);

        return aciton.payload;
      })
      .addCase(postChangeCartAsync.fulfilled, (state, action) => {
        console.log("postChangeCartAsync.fulfilled");
        console.log(action);

        return action.payload;
      });
  },
});

export default cartSlice.reducer;
