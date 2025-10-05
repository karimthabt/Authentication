import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./actions/userApi";

import { ForgotcodeAPI } from "./actions/ForgotcodeAPI";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [ForgotcodeAPI.reducerPath]: ForgotcodeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, ForgotcodeAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
