const express = require("express");
const cors = require("cors");

const leaveRoutes = require("./routes/leave.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/leaves", leaveRoutes);

app.listen(3000, () => {

console.log("Server running on port 3000");

});