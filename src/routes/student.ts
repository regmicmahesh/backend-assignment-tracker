import express from "express";
import { getTeacher, joinTeacher } from "../controller/student";
import getUser from "../db/users";
import JWTMiddleware from "../middleware/jwtToken";
import { schemaValidator } from "../utils/errorUtils";
import { roleMiddleware } from "../utils/roleUtils";
import { joinTeacherSchema } from "./student.schema";

const router = express.Router();

router.use(roleMiddleware("STUDENT"));

router.post("/join", schemaValidator(joinTeacherSchema), joinTeacher);
router.get("/teacher", getTeacher);

export default router;
