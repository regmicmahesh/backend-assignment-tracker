import express from "express";
import authRouter from "./routes/auth";
import teacherRouter from "./routes/teacher";
import assignmentRouter from "./routes/assignment";
import studentRouter from "./routes/student";
import userRouter from "./routes/user";
import { errorHandler } from "./utils/errorUtils";
import cors from "cors";
import JWTMiddleware from "./middleware/jwtToken";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);


//All requests below should be authenticated.
app.use(JWTMiddleware);

app.use("/user", userRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/assignment", assignmentRouter);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server Running");
});
