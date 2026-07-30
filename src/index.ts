import express from "express";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import specs from "./config/swaggerUIConfig.ts";
import connectDB from "./config/mongoDB.ts";
import authRouter from './router/authRoute.ts'
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/auth',authRouter)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Couldn't connect to the database! " + error);
  });
