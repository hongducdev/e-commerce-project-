import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state, action) => {});
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.newProducts = action.payload;
    });
    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.newProducts = [];
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
