import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes";
import connection from "./db/db";
import cornSheduler from "./utils/node-corn";
dotenv.config({ path: "./.env" });

const PORT: string | number = process.env.PORT || 8000;
const app = express();
cornSheduler();
app.listen(PORT, () => {
  console.log("Server listen listen on " + PORT);
});
connection();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// limit on json
app.use(express.json({ limit: "25kb" }));
// url encoded
app.use(express.urlencoded({ extended: true, limit: "25kb" }));
// cookie parse to excess cokkie
app.use(cookieParser());
// app.use router
app.use("/", router);
