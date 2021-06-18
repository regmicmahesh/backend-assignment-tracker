import database from "./database";

export interface Assignment{
  id?: number,
  title: string,
  description: string,
  teacher_id: number
}

const getTable = () => database.table<Assignment>("assignment");


export default getTable;
