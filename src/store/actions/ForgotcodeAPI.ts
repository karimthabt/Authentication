// src/redux/actions/ForgotcodeAPI.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SendCodeResponse {
  message: string;
  code: string;
}

export const ForgotcodeAPI = createApi({
  reducerPath: "ForgotcodeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sendCode: builder.mutation<SendCodeResponse, { email: string }>({
      query: (data) => ({
        url: "/auth/forgotcode",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

// ✅ التصدير مهم هنا
export const { useSendCodeMutation } = ForgotcodeAPI;
