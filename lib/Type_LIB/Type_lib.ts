export interface IErrorResponse {
  error: {
    datails?: {
      error: {
        message: string;
      }[];
    };
    message?: string;
  };
}

export interface IUserAPP {

    _id?: string;

    userName: string;
    email: string;
    password: string;
    code?: string;
    phone?: string;
    image?: string;
    avatar?: string;
    userRole?: string;
    createdAt?: string;
  };
// types/index.ts

export interface IPostAPP {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  likesCount: number;
  likedByMe: boolean;

  author: IUserAPP; // ← أضف هذا السطر
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
