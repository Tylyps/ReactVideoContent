import { UserModel } from "./user";

export interface TokenModel {
  Token: string;
  TokenExpires: string;
  RefreshToken?: string;
}

export interface SignInModel {
  Username: string;
  Password: string;
}

export interface SignedUserModel {
  AuthorizationToken: TokenModel;
  User: UserModel
}