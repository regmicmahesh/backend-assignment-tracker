import { Router } from "express";
import { loginController, registerController } from "../controller/auth";
import { schemaValidator } from "../utils/errorUtils";
import {loginSchema, registerSchema} from "./auth.schema";

const router = Router();

router.post("/login", schemaValidator(loginSchema), loginController);
router.post("/register", schemaValidator(registerSchema), registerController);

export default router;
