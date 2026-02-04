const express = require("express");
const app = express();
require("dotenv").config();
const dbconnection = require("./DBconfig.js");
const routes = require("./routes/routes.js")
const route = require("./routes/route.js")

app.use(express.json());
const PORT = process.env.PORT || 5000;
dbconnection();
app.use("/api", routes)
app.use("/", route)

app.listen(PORT, () => console.log(`port running ${PORT}`));
