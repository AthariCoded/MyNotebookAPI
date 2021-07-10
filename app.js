const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const noteRoutes = require("./API/note/routes");
const notebookRoutes = require("./API/notebook/routes");
//DATEBASE
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Notebook and Note Routes ===============\\
app.use("/notes", noteRoutes);
app.use("/notebooks", notebookRoutes);

//========== Error Handling Middleware ==========\\
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "internal Server Error." });
});

//=========Path Not Found===========\\
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

//===============================\\
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
    //} catch {
  } catch (error) {
    console.error(error);
  }
};
run();
