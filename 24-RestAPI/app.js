const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

const feedRoutes = require("./routes/feed");

// app.use(bodyParser.urlencoded()) //--->x-www-form-urlencoded <form>
app.use(bodyParser.json()); //---> application JSON

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.listen(PORT);
