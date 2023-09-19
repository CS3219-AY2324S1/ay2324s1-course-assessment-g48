import axios from "axios";
import { CreateUserDto, UpdateUserDto, User } from "./entities/user.entity";
import { OAuthType } from "@/utils/enums/OAuthType";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/users";

export const createNewUser = async (newUser: CreateUserDto) => {
  try {
    return await axios
      .post(BASE_URL, {
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        oauth: newUser.oauth,
        role: newUser.role
      })
      .then((response) => {
        return response.data;
      });
  } catch (e: any) {
    return e.response.data;
  }
};

export const getAllUsers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

// TODO: Hash the password
export const login = async ({
  email,
  password,
  oauth,
}: {
  email?: string;
  password?: string;
  oauth?: OAuthType;
}): Promise<User | undefined> => {
  if (!email || (!password && !oauth)) {
    return undefined;
  }
  try {
    const res = await axios.get(BASE_URL + "/login", {
      data: { email, password, oauth },
    });
    return res.data;
  } catch (e: any) {
    console.error(e.response.data);
    return undefined;
  }
};

export const deleteUserById = async (id: number) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  console.log(response);
  return response.data;
};

export const updateUserById = async (
  id: number | undefined,
  updatedUser: UpdateUserDto
) => {
  try {
    if (!id) {
      throw new Error("User ID not provided");
    }
    const response = await axios.put(BASE_URL + "/" + id, {
      email: updatedUser.email,
      username: updatedUser.username,
      password: updatedUser.password,
      oauth: updatedUser.oauth,
      role: updatedUser.role
    });
    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
};
