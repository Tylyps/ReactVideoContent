export interface UserModel {
  id: number;
  UserName: string;
  FullName: string;
  ClientRoles: string[];
  Email?: string;
  Initials?: string;
  AvatarUrl?: string;
  PhoneNumber?: string;
}