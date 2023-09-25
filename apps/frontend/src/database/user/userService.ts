import axios from "axios";
import { CreateUserDto, UpdateUserDto, User } from "./entities/user.entity";
import { OAuthType } from "@/utils/enums/OAuthType";

export const BASE_URL = process.env.NEXT_PUBLIC_USER_SERVICE + "/api/users";

export const createNewUser = async (newUser: CreateUserDto) => {
  console.log("Creating new user", BASE_URL)
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
        console.log("Create user success", response.data)
        return response.data;
      });
  } catch (e: any) {
    console.log("Create new user error", e)
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
  console.log("All details: ",email, password, oauth);
  if (!email || (!password && !oauth)) {
    console.error("Email or password not provided");
    return undefined;
  }
  try {
    console.log("Sending request")
    console.log(BASE_URL + "/login")
    const res = await axios.get(BASE_URL + "/login", {
      data: { email, password, oauth },
    });
    console.log("Got response", res.data)
    return res.data;
  } catch (e: any) {
    console.log("Errrrorrr")
    // console.error(e.response.data);
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
