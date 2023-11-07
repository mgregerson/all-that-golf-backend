import { Router } from "express";
import { hash, compareSync } from "bcrypt";
import { prisma } from "../../lib/prisma";
import { login, register } from "./services";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Please fill all required fields",
      });
    }

    console.log("in register");

    const user = await register(username, email, password);

    return res.json({
      user: {
        name: user.username,
        email: user.email,
        id: user.id,
      },
    });
  } catch (error: any) {
    if (
      error.message === "A user with this username or email already exists."
    ) {
      return res.status(400).json({
        error: "A user with this username or email already exists.",
      });
    }
    console.log(error, "ERROR IN /REGISTER");
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        error: "Please fill in all required fields",
      });
    }

    console.log("in login");
    const foundUser = await login(email, password);

    if (foundUser) {
      return res.json(foundUser);
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    return res.json({ error });
  }
});
