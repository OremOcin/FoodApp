const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/FoodApp")
  .then(() => console.log("Mongodb connected"))
  .catch((error) => console.error("Mongodb connection error", error));

app.listen(PORT, () => {
  console.log("Le serveur écoute au : http://127.0.0.1:", PORT);
});
