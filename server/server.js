require("dotenv").config();
require("express-async-errors");

import express from "express";
import fs from "fs";
import cors from "cors";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

var path = require("path");
const morgan = require("morgan");

const csrfProtection = csrf({ cookie: true });

//create express app
const app = express();

//apply middlewares
app.use(cookieParser());

app.use(cors());

app.use(express.json());
//logging
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

fs.readdirSync("./routes").map((route) =>
  app.use("/expressapi", require(`./routes/${route}`))
);

//csrf
app.use(csrfProtection);

app.get("/expressapi/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(notFound);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
