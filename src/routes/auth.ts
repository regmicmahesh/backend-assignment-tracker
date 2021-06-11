import {Router} from "express";
import {loginController, registerController} from "../controller/auth";

const router = Router();

router.post("/login", loginController)
router.post("/register", registerController)

export default router;
