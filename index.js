require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const dbConnection = require("./src/dbConnection");
const errorHandler = require("./src/utils/errorHandler");
const { customHeader } = require("./src/utils/middlewares");

const origin = ["http://localhost:3126"];

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4002;

dbConnection().then(async () => {
  app.use(
    cors({
      origin, // Sesuaikan untuk development
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(customHeader);
  app.use("/", require("./src/routes"));
  app.use(errorHandler);

  server.listen(PORT, () => {
    // Gunakan server.listen, bukan app.listen
    console.log(`Server is running on port ${PORT}`);
  });
});
