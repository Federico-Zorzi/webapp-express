// DOTENV CONFIGURATION
require("dotenv").config();

// EXPRESS CONFIGURATION
const express = require("express");
const app = express();
const { SERVER_DOMAIN, SERVER_PORT } = process.env;

// MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));

// ROUTERS CONFIGURATION
const moviesRouter = require("./routers/moviesRouter");
app.use("/api/movies", moviesRouter);

// ERRORS HANDLER
const errorsHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(errorsHandler);
app.use(notFound);

// SERVER LISTENING CONFIGURATION
app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at ${SERVER_DOMAIN}:${SERVER_PORT}`);
});
