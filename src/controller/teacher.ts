import {RequestHandler} from "express";
import {v4 as uuidv4} from "uuid";
import getUser from "../db/users"

export const getAllStudents: RequestHandler = async (req, res) => {
  const users = await getUser().where("teacher_id", "=", req.user.id);
  return res.json({ users });
};

export const changeTeacherCode: RequestHandler = async (req, res) => {
  const id = uuidv4();
  const code = await getUser().where("id", "=", req.user.id).update({ teacher_code: id }).returning("teacher_code");
  return res.json({ code: code[0] });
};


export const getSingleStudent: RequestHandler = async (req, res) => {

  const id = parseInt(req.params.id);
  const user = (await getUser().where("teacher_id", "=", req.user.id).where("id", "=", id).first()) || null;
  return res.json({ user });


}


export const disassociateStudent: RequestHandler = async (req, res) => {

  const id = parseInt(req.params.id);
  await getUser().where("teacher_id", "=", req.user.id).andWhere("id", "=", id).update({ teacher_id: null });
  return res.json({ message: "Delete Successful" });

}
