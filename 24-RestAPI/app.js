const express = require("express");

const app = express();

const PORT = 8080;

const feedRoutes = require("./routes/feed");

app.use("/feed", feedRoutes);

app.listen(PORT);
