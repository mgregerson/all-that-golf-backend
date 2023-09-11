import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const scoresRouter = Router();

scoresRouter.get("/", async (req, res) => {
  try {
    const typingTests = await prisma.score.findMany();
    res.json(typingTests);
  } catch (error) {
    res.json({ error });
  }
});

scoresRouter.get(`/:id/`);

scoresRouter.post("/add", async (req, res) => {
  console.log(req.body, "REQ BODY BB");
  try {
    const {
      userId,
      typingTestId,
      wpm,
      accuracy,
      timeTaken,
      mistakes,
      wordsCorrect,
      totalWords,
    } = req.body;
    // You can validate userId and typingTestId here to ensure they exist and are valid.

    const newScore = await prisma.score.create({
      data: {
        userId,
        typingTestId,
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
    console.error("Error creating score:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the score." });
  }
});
