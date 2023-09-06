import { compareSync, hash } from "bcrypt";
import { prisma } from "../../lib/prisma";
import { sign } from "jsonwebtoken";

export async function login(email: string, password: string) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log(foundUser, "foundUser");

    if (!foundUser) {
      throw new Error("A user with this username does not exist.");
    }

    const isMatch = compareSync(password, foundUser.password);

    console.log(isMatch, "isMatch");

    if (isMatch) {
      const token = sign(
        { _id: foundUser.id?.toString(), username: foundUser.username },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "2 days",
        }
      );
      return {
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        },
        token,
      };
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    throw error;
  }
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  return user;
}
