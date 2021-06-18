import { RequestHandler } from "express";
import getUser from "../db/users";
import getAssignmentTable from "../db/assignment";

export const getAssignmentForTeacherorUser: RequestHandler = async (req, res) => {
  const teacher_id = (await getUser().where("id", "=", req.user?.id))[0].teacher_id!;
  const assignment = await getAssignmentTable()
    .where("assignment.teacher_id", "=", req.user?.id)
    .orWhere("assignment.teacher_id", "=", teacher_id)
    .join("user", "assignment.teacher_id", "=", "user.id")
    .select("assignment.teacher_id", "assignment.title", "assignment.description", "user.username", "assignment.id");

  return res.json({ assignments: assignment });
};

export const getSingleAssignment: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);

  const assignment = await getAssignmentTable()
    .where("id", "=", id)
    .andWhere("teacher_id", "=", req.user?.id)
    .orWhere("teacher_id", "=", req.user?.teacher_id);

  return res.json({ assignment: assignment[0] });
};

export const createAssignment: RequestHandler = async (req, res) => {
  const { title, description } = req.body;
  const teacher_id = req.user?.id;

  const dbRes = await getAssignmentTable().insert({ title, description, teacher_id }).returning("*");
  const insertedAssignment = dbRes[0];

  return res.json({ assignment: insertedAssignment });
};

export const deleteAssignment: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);

  const assignment = await getAssignmentTable().where("id", "=", id).andWhere("teacher_id", "=", req.user?.id).delete();

  res.json({ message: "Delete Successful" });
};
