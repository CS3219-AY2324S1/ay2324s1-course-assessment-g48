import axios from "axios";
import { User } from "./entities/user.entity";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/users";

export const createNewUser = async (newUser: User) => {
  return await axios
    .post(BASE_URL, {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllUsers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};

export const deleteUserById = async (id: number) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  console.log(response);
  return response.data;
};

export const updateUserById = async (
  id: number,
  updatedUser: Partial<User>
) => {
  const response = await axios.put(BASE_URL + "/" + id, {
    email: updatedUser.email,
    username: updatedUser.username,
    password: updatedUser.password,
  });
  return response.data;
};
