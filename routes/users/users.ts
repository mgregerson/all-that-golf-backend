import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { Difficulty } from "@prisma/client";

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

usersRouter.get("/:id/scores/:difficulty", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const difficulty = req.params.difficulty;

    // Ensure that the difficulty level is valid based on your application's requirements
    // You may want to add additional validation logic here

    // First, fetch the user by their ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Now, you can fetch all scores for the user that match the specified difficulty
    const userScores = await prisma.score.findMany({
      where: {
        userId,
        typingTest: {
          difficulty: difficulty as Difficulty,
        },
      },
    });

    res.json(userScores);
  } catch (error) {
    console.error("Error fetching user scores:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user scores." });
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
