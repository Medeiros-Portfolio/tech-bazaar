import "reflect-metadata";
import "express-async-errors";
import "../../container/index";

import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes)

export { app };
