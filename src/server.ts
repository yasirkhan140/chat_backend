import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes";
import connection from "./db/db";
import cornSheduler from "./utils/node-corn";
import http from "http";
import { setupSocketIO } from "./socket/iniliseSocket.socket";
dotenv.config({ path: "./.env" });

const PORT: number = parseInt(process.env.PORT as string) || 8000;
const app = express();
const server = http.createServer(app);
setupSocketIO(server);
cornSheduler();

connection();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// limit on json
app.use(express.json({ limit: "26kb" }));
// url encoded
app.use(express.urlencoded({ extended: true, limit: "26kb" }));
// cookie parse to excess cokkie
app.use(cookieParser());
// app.use router
app.use("/", router);

server.listen(PORT, () => {
  console.log("Server listen listen on " + PORT);
});