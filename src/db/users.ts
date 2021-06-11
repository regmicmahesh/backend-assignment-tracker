import database from "./database";

export interface User {

  id: number,
  username: string;
  password: string;
  role: "STUDENT" | "TEACHER";

}

const getTable = () => database.table<User>("user")

export const getAllUsers = async () => {
  const users = await getTable().select("username");
  return users;
};

export const getUser = async (username: string) => {
  const user = await getTable().where("username", "=", username).first();
  return user;
}

export const createUser = async (user: User) => {
  const savedUser = await getTable().insert(user).returning("*");
  const returnUser = { username: savedUser[0].username }
  return returnUser;
}

