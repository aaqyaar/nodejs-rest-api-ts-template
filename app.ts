import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app: Express = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors is a middleware that allows us to make requests from our client
app.use(cors());

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// use morgan to log requests to the console in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
