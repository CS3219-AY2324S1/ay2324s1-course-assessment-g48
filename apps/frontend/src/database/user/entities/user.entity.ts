import { OAuthType } from "@/utils/enums/OAuthType";
import { Role } from "@/utils/enums/Role";

export type User = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  image?: string;
  oauth?: OAuthType[];
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiry?: number;
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<User>;
