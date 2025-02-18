require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const api = express();
const apiPort = process.env.PORT || 3000;

api.use(cors());
api.use(helmet());

api.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
api.use(bodyParser.json({ limit: "100mb" }));
api.options("*", cors());

routerApi(api);

api.use('/files', express.static(path.join(__dirname, '/files')));
api.get("/download/:file(*)", (req, res) => {
  const file = req.params.file;
  const fileLocation = path.join(__dirname, "files", file);

  if (file.includes("..")) {
    return res.status(400).json({
      title: "Bad Request",
      message: "Invalid file path",
    });
  }

  res.download(fileLocation, file, (err) => {
    if (err) {
      res.status(404).json({ message: "File not found" });
    }
  });
});

api.use(logErrors);
api.use(ormErrorHandler);
api.use(boomErrorHandler);
api.use(errorHandler);

const apiServer = http.createServer(api);

apiServer.listen(apiPort, () => {
  console.log(`API running on port ${apiPort}`);
  console.log("Testing DB Connection:");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
