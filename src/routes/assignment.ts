import { Router } from "express";
import { roleMiddleware } from "../utils/roleUtils";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentForTeacherorUser,
  getSingleAssignment,
} from "../controller/assignment";
import { schemaValidator } from "../utils/errorUtils";
import { assignmentSchema } from "./assignment.schema";

const router = Router();

router.get("/", getAssignmentForTeacherorUser);
router.get("/:id", getSingleAssignment);

router.use(roleMiddleware("TEACHER"));

router.post("/", schemaValidator(assignmentSchema), createAssignment);
router.delete("/:id", deleteAssignment);

export default router;
