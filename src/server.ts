import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes.js";
import sequelize from "./db/db.js";
dotenv.config({ path: "./.env" });

const PORT: string | number = process.env.PORT || 8000;
const app = express();

app.listen(PORT, () => {
  console.log("Server listen listen on " + PORT);
});
sequelize
  .authenticate()
  .then(() => {
    console.log("connect successfully database");
  })
  .catch((err) => {
    console.log(`error in connecting database ${err}`);
  });
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
