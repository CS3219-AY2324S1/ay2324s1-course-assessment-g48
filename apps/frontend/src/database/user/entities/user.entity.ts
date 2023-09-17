import { OAuthType } from "@/utils/enums/OAuthType";

export type User = {
  id: number;
  username: string;
  email: string;
  password?: string;
  oauth?: OAuthType[];
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<Omit<User, "id">> & Pick<User, "id">;
