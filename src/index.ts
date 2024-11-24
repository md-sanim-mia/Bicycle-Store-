import express, { Application, Request, Response } from "express";
import cors from "cors";
import route from "./app/Bicycle/bicycle.router";
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api", route);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export = app;
