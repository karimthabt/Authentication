import { IUser } from "@/types/Users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserAPP } from "../../../lib/Type_LIB/Type_lib";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include", // علشان الـ cookies تتبعت
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUser: builder.query<{ users: IUser[] }, void>({
      query: () => "/user/getAllUser",
      providesTags: ["User"],
    }),
    updateRole: builder.mutation<IUser, { userId: string; userRole: string }>({
      query: ({ userId, userRole }) => ({
        url: `/user/updateDBuser/${userId}`,
        method: "PUT",
        body: { userRole },
      }),
      invalidatesTags: ["User"],
    }),
    getToken: builder.query<{ token: string }, void>({
      query: () => "/auth/token",
    }),
    getMeUser: builder.query<IUserAPP, void>({
      query: () => `/user/me`,
      providesTags: ["User"],
    }),
    userLogin: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (DataLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: DataLogin,
      }),
      invalidatesTags: ["User"],
    }),
    userRegister: builder.mutation<IUserAPP, Partial<IUserAPP>>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    userVerifyCode: builder.mutation<
      { token: string },
      { code: string; email: string }
    >({
      query: (code) => ({
        url: "/auth/verifyCode",
        method: "POST",
        body: code,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUpdateRoleMutation,
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserVerifyCodeMutation,
  useGetAllUserQuery,
  useGetTokenQuery,
  useGetMeUserQuery,
} = userApi;
