export interface IUser {
  _id: string;
  userName: string;
  email: string;
  image?: string;
  userRole: "ادمن" | "مستخدم" ;
  ip: string;
}
