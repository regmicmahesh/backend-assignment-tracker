import { RequestHandler } from "express";
import getUser from "../db/users";

export const joinTeacher: RequestHandler = async (req, res) => {
  console.log("hi");
  const { code } = req.body;
  const teacher = await getUser().where("teacher_code", "=", code);

  if (teacher.length == 0) {
    return res.status(400).json({ error: "Invalid Teacher Code" });
  }

  const teacher_id = teacher[0].id;
  await getUser().where("id", "=", req.user?.id).update({ teacher_id });
  return res.json({ message: "Succesfully Joined.", teacher_id });
};

export const getTeacher: RequestHandler = async (req, res) => {
  const user = await getUser().where("id", "=", req.user.teacher_id).whereNotNull("teacher_id");
  const { password, ...savedUser } = user[0];
  return res.json({ user: savedUser });
};
