const express = require("express");
const app = express();
const PORT = 8086;
const employeeRoute = require("./routes/employee.route");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectDb");
const cors = require("cors")

app.use(express.json());
app.use(cors())
connectDb();
app.use("/employee", employeeRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
