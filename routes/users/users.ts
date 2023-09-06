import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(user);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.put("/:id", async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(deletedUser);
  } catch (error) {
    res.json({ error });
  }
});
