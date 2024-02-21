import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import actorRouter from "./routes/actorRouter.js";
import producerRouter from "./routes/producerRouter.js";
import movieRouter from "./routes/moviesRouter.js";
import userRouter from "./routes/userRouter.js";

const server = express();
server.use(cors());
server.use(bodyparser.json());

mongoose
  .connect("mongodb+srv://admin:imdbclone@cluster0.mpkpx10.mongodb.net/")
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use("/api", actorRouter);
server.use("/api", producerRouter);
server.use("/api", movieRouter);
server.use("/api", userRouter);

server.use((error, req, res, next) => {
  const statuscode = error.statuscode || 500;
  const message = error.message || "Internal server error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

server.listen(8000, () => {
  console.log("server connected");
});
