import { RequestHandler } from "express";
import { User } from "../db/users";
import { createJWT } from "../middleware/jwtToken";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import getUser from "../db/users";

export const loginController: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = (await getUser().where("username", "=", username))[0];
  if (!user) {
    return res.status(400).json({ error: "Invalid Username or Password" });
  }

  const valid = await comparePassword(user.password, password);

  const { password: pwd, ...responseUser } = user;
  if (valid) {
    const jwt = await createJWT(user);
    return res.json({ message: "", access_token: jwt, user: responseUser });
  } else {
    res.status(400).json({ error: "Invalid Username or Password" });
  }
};

export const registerController: RequestHandler = async (req, res) => {
  const { username, password, role } = req.body;

  const user = await getUser().where("username", "=", req.user?.username);

  if (user) {
    return res.status(400).json({ errors: [{ key: "username", message: "User already exists." }] });
  }

  const hashedPassword = await hashPassword(password);

  const createdUser = await getUser()
    .insert({
      username,
      password: hashedPassword,
      role,
    })
    .returning("*");

  const jwt = await createJWT(createdUser[0] as User);
  res.json({
    message: "Registration Successful",
    user: createdUser,
    access_token: jwt,
  });
};
