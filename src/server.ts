import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });
const PORT: string | number =  process.env.PORT||8000 ;
const app = express();


app.listen(PORT, () => {
  console.log("Server listen listen on " + PORT)
});

