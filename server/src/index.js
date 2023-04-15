const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();
const cors = require("cors");
const multer = require("multer");

const path = require("path");

mongoose.set({ strictQuery: true });
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../dist")));

app.use(express.json());

app.use(cors());
app.use(multer().any());

mongoose
  .connect(
    process.env.connectionString,
    { dbName: "fsoc" },
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/api", route);

app.listen(process.env.port, function () {
  console.log("Express app running on port " + process.env.port);
});

app.get("*", (req, res) => {
  const filename = path.join(__dirname, "../dist/index.html");
  res.sendFile(filename);
});
