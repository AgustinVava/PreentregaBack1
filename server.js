import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("server ready on port " + port);
  server.listen(port, ready);

  server.use(morgan("dev"));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  // morgan es un middleware de terceros que habilita el registro de cada una de las solicitudes en la consola
  server.use(cors());
  // cors es un middlewares de terceros que permite que "se crucen los origines" (back 8000 con front en 3000/5172)

  //obligo a mi servidor a usar las rutas del enrutador
  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);
} catch (error) {
  console.log(error);
}