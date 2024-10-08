import express from "express";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";


try {
  const server = express();
  const port = 8080;
  const ready = () => console.log("server ready on port " + port);
  const httpServer = createServer(server);
  const tcpServer = new Server(httpServer);
  tcpServer.on("connection", socket => {
    console.log("Socket connected is:" + socket.id);

  })
  httpServer.listen(port, ready);

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
