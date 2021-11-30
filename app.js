// declarations ( selectors )
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const axios = require("axios");
const nodemon = require("nodemon");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//connection

const app = express();

app.use(bodyparser.json());
app.use(cors());
// app.use(express.static("public"));

// mongo db connection

const mongouri = process.env.MONGODBURI;

mongoose
  .connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("congrats database got connected");
    console.log("----------------------------------------------");
  })
  .catch((err) => {
    console.log("failed to connect database");
  });

//importing routes from routes-folder
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const medicineRoutes = require("./routes/medicine.routes");

//to access images
app.use("/productimages", express.static("upload/productimages"));
app.use("/medicineimages", express.static("uplaod/medicineimages"));

// <---- Routes --->

app.use(productRoutes);
app.use(userRoutes);
app.use(medicineRoutes);

//node server
app.get("/", (req, res) => {
  res.status(200).json({ success: "server is running" });
});

const server = http.createServer(app);

//listen
const port = process.env.PORT || 5500;

server.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
