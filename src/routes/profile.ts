import {Router} from "express";
import JWTMiddleware from "../middleware/jwtToken";

const router = Router()


router.use(JWTMiddleware)


router.get("/me", async (req, res) => {


  res.json({message: "Hi"})

})


export default router;
