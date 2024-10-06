import express from "express";
import morgan from "morgan";
import cors from "cors";
import { engine } from "express-handlebars";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import { createServer } from "http";  // Importar createServer
import { Server } from "socket.io";    // Importar Server de socket.io

try {
  const server = express();
  const httpServer = createServer(server);  // Crear el servidor HTTP
  const io = new Server(httpServer);         // Instanciar Socket.io con el servidor HTTP

  const port = 8080;
  const ready = () => console.log("server ready on port " + port);
  httpServer.listen(port, ready);  // Usar httpServer para escuchar

  server.use(morgan("dev"));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(express.static('public')); 
  server.use(cors());
  server.use("/public", express.static("public"))

  server.engine("handlebars", engine());
  server.set("view engine", "handlebars");
  server.set("views", __dirname + "/src/views");

  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);

  // Escuchar conexiones de Socket.io
  io.on("connection", (socket) => {
    console.log("New client connected");
    
    // Aquí puedes manejar eventos de socket
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

} catch (error) {
  console.log(error);
}
