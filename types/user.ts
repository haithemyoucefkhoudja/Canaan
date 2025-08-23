import { User } from "@prisma/client";
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
}
export interface IUser extends User {
  app_role: UserRole;
}
