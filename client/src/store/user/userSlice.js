import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    current: null,
    token: null,
  },
  reducers: {
    register: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.current = action.payload.userData;
      state.token = action.payload.token;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(actions.getNewProducts.pending, (state, action) => {});
  //   builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
  //     state.newProducts = action.payload;
  //   });
  //   builder.addCase(actions.getNewProducts.rejected, (state, action) => {
  //     state.newProducts = [];
  //   });
  // },
});

export const {
  register,
} = userSlice.actions;

export default userSlice.reducer;
