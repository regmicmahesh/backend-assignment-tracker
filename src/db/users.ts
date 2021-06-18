import database from "./database";

export interface User {

  id: number,
  username: string;
  password: string;
  role: "STUDENT" | "TEACHER";
  teacher_id: number | null;
  teacher_code: string | null;

}

const getTable = () => database.table<User>("user")

const getAllUsers = async () => {
  const users = await getTable().select("username");
  return users;
};

const getUser = async (username: string) => {
  const user = await getTable().where("username", "=", username).first();
  return user;
}



const createUser = async (user: User) => {
  const savedUser = await getTable().insert(user).returning("*");
  const {password, ...res} = savedUser[0]
  return res;
}


export default getTable;
