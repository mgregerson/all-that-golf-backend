import express from "express";
import { authRouter } from "./auth/auth";
import { usersRouter } from "./users/users";
import { typingTestsRouter } from "./typingTests/typingTests";
import { auth } from "../middleware/auth";

export const routes = express.Router();
routes.use("/auth", authRouter);
routes.use("/users", auth, usersRouter);
routes.use("/typingtests", auth, typingTestsRouter);
