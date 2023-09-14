export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<Omit<User, "id">> & Pick<User, "id">;
