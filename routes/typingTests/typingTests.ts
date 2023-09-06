import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { Difficulty } from "@prisma/client";

export const typingTestsRouter = Router();

typingTestsRouter.get("/", async (req, res) => {
  try {
    const typingTests = await prisma.typingTest.findMany();
    res.json(typingTests);
  } catch (error) {
    res.json({ error });
  }
});

typingTestsRouter.get("/:difficulty", async (req, res) => {
  try {
    const typingTests = await prisma.typingTest.findMany({
      where: {
        difficulty: req.params.difficulty as Difficulty,
      },
    });
    res.json(typingTests);
  } catch (error) {
    res.json({ error });
  }
});

typingTestsRouter.get("/:difficulty/random", async (req, res) => {
  try {
    const typingTests = await prisma.typingTest.findMany({
      where: {
        difficulty: req.params.difficulty as Difficulty,
      },
    });
    const randomIndex = Math.floor(Math.random() * typingTests.length);
    res.json(typingTests[randomIndex]);
  } catch (error) {
    res.json({ error });
  }
});

typingTestsRouter.get("/:id", async (req, res) => {
  try {
    const typingTest = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(typingTest);
  } catch (error) {
    res.json({ error });
  }
});
