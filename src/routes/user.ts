import { Router } from "express";
import getUser from "../db/users";
import JWTMiddleware from "../middleware/jwtToken";
import { roleMiddleware } from "../utils/roleUtils";

const router = Router();

router.use(JWTMiddleware);

router.get("/profile", async (req, res) => {
  const user = await getUser().where("id", "=", req.user.id);
  const { password, ...savedUser } = user[0];
  return res.json({ user: savedUser });
});

export default router;
