import { OAuthType } from "@/utils/enums/OAuthType";
import { Role } from "@/utils/enums/Role";

export type User = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  oauth?: OAuthType[];
  role?: Role;
  accessToken?: string;
  refreshToken?: string;
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<User>;
