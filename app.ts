import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { readdirSync } from "fs";
import path from "path";
import { connectDB } from "./src/config";
import "dotenv/config";
import { errorHandler, notFound } from "./src/middlewares/error";

const app: Express = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cors is a middleware that allows us to make requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // allow to server to accept request from different origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// use morgan to log requests to the console in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  return res.sendFile(
    path.join(__dirname.replace("/dist", "/public"), "/index.html")
  );
});

// app.all("*", (req: Request, res: Response) => {
//   return res.sendFile(
//     path.join(__dirname.replace("/dist", "/public"), "/404.html")
//   );
// });

// Import all routes
readdirSync(`${__dirname}/src/routes`).map(async (r) => {
  const router: any = await import(`${__dirname}/src/routes/${r}`);
  app.use("/api/v1", router.default);
});
// Error handler
// app.use("*", notFound);
// app.use(errorHandler);

export default app;
