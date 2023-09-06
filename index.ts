import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
