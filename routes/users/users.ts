import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { uploadFile } from "../../utils/supabase";
import { type } from "os";

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

usersRouter.post("/:id/upload/profile-image", async (req, res) => {
  try {
    const { file, id } = req.body;
    const uploaded = await uploadFile(file, id);
    if (uploaded) {
      res.json({ message: `File uploaded successfully: ${uploaded}` });
    } else {
      res.json({ message: "File upload failed" });
    }
  } catch (error) {
    res.json({ error });
  }
});

// const deletedUser = await prisma.user.delete({
//   where: {
//     id: Number(req.params.id),
//   },
// });

// `users/${username}/scores/${difficulty}`,

// export const getPastScoresByUserAndDifficulty = async (
//   username: string,
//   difficulty: string
// ) => {
//   try {
//     const userId = await userModel.findOne({ username });

//     if (!userId) {
//       throw new Error("User not found");
//     }

//     const userIdString = userId._id.toString();

//     const scores = await scoreModel
//       .find({
//         user: userIdString,
//         difficulty: difficulty,
//       })
//       .sort({ date: -1 })
//       .populate("typingTest");

//     if (scores.length > 0) {
//       const pastScores = scores.slice(1);
//       return pastScores;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     throw new Error("Failed to get past scores");
//   }
// };
