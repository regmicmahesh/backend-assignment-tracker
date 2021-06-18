import { Router } from "express";
import { roleMiddleware } from "../utils/roleUtils";
import { changeTeacherCode, disassociateStudent, getAllStudents, getSingleStudent } from "../controller/teacher";

const router = Router();

router.use(roleMiddleware("TEACHER"));

router.get("/student", getAllStudents);
router.post("/invite", changeTeacherCode);
router.get("/student/:id", getSingleStudent);
router.delete("/student/:id", disassociateStudent);

export default router;
