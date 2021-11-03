const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const port = process.env.PORT;
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/profile", express.static("upload/images"));
app.post("/fileUpload", upload.single("profile"), (req, res) =>
  res.status(201).json({
    success: true,
    path_url: `http://localhost:${port}/profile/${req.file.filename}`,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    data: "hello",
  });
});

app.use("/employee", routes);

module.exports = app;
