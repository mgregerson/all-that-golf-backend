import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { uploadFile } from "../../utils/supabase";
import { auth } from "../../middleware/auth";
import { type } from "os";

export const usersRouter = Router();

usersRouter.get("/", auth, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.json({ error });
  }
});

usersRouter.get("/:id", auth, async (req, res) => {
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

usersRouter.put("/:id", auth, async (req, res) => {
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

usersRouter.delete("/:id", auth, async (req, res) => {
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

usersRouter.post("/:id/upload/profile-image", auth, async (req, res) => {
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
