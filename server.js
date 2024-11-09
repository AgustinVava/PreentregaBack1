import "dotenv/config.js"
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./src/utils/utils.js";
import socketCallBack from "./src/routers/index.socket.js";
import dbConnect from "./src/utils/db.util.js";


try {
  const server = express();
  const port = process.env.PORT || 8080;
  const ready = () => console.log("server ready on port " + port);
  dbConnect()
  const httpServer = createServer(server);
  httpServer.listen(port, ready);
  const tcpServer = new Server(httpServer);
  tcpServer.on("connection", socketCallBack)
  

  server.use(morgan("dev"));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  server.use("/public", express.static("public"))

  server.engine("handlebars", engine());
  server.set("view engine", "handlebars");
  server.set("views", __dirname + "/src/views");

  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);
} catch (error) {
  console.log(error);
}
