import { OAuthType } from "@/utils/enums/OAuthType";
import { Role } from "@/utils/enums/Role";

export type User = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  oauth?: OAuthType[];
  role?: Role;
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<User>;
