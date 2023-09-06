import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const scoresRouter = Router();

scoresRouter.get("/", async (req, res) => {
  try {
    const typingTests = await prisma.typingTest.findMany();
    res.json(typingTests);
  } catch (error) {
    res.json({ error });
  }
});

scoresRouter.post("/add", async (req, res) => {
  try {
    const {
      user,
      typingTest,
      wpm,
      accuracy,
      timeTaken,
      mistakes,
      wordsCorrect,
      totalWords,
    } = req.body;
    const newScore = await prisma.score.create({
      data: {
        user: { connect: { id: user } },
        typingTest: { connect: { id: typingTest } },
        wpm,
        accuracy,
        timeTaken,
        mistakes,
        wordsCorrect,
        totalWords,
      },
    });
    res.json(newScore);
  } catch (error) {
    res.json({ error });
  }
});
