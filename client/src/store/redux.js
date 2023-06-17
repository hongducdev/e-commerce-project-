import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
import productSlice from "./products/productSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userSlice from "./user/userSlice";

const persistConfig = {
  key: "shop/user",
  storage,
}

const userConfig = {
  ...persistConfig,
  whitelist: ["isLogin", "token"],
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    user: persistReducer(userConfig, userSlice),
  },
});

export const persistor = persistStore(store);
