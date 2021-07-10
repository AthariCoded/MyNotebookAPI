const express = require("express");

const {
  notebookFetch,
  createNotebook,
  createNote,
  fetchNotebook,
} = require("./controllers");

const router = express.Router();

// param middleware (parameter)
router.param("notebookId", async (req, res, next, notebookId) => {
  // get the notebook with id notebookId
  const notebook = await fetchNotebook(notebookId, next);
  if (notebook) {
    // store it in req
    req.notebook = notebook;
    next();
  } else {
    // give back response 404 Notebook Not Found
    const error = new Error("Notebook Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", notebookFetch);

// Create Notebook Route
router.post("/", createNotebook);

// Create Note Route
router.post("/:notebookId/notes", createNote);

module.exports = router;
