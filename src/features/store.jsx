import { configureStore } from "@reduxjs/toolkit";
import { redux } from "../services/storeRedux";

export const store = configureStore({
  reducer: {
    [redux.reducerPath]: redux.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redux.middleware),
});
