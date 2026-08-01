import express from "express";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import specs from "./config/swaggerUIConfig.ts";
import authRouter from "./router/authRoute.ts";
import movieRouter from "./router/movieRoute.ts";
import bookingRouter from "./router/bookingRoute.ts";
import { requestLogger } from "./middleware/logger.ts";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/auth", authRouter);

app.use("/movies", movieRouter);

app.use("/booking", bookingRouter);

export default app;
