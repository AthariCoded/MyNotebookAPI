const express = require("express");

const {
  noteFetch,
  //createNote,
  deleteNote,
  // updateNote,
  fetchNote,
} = require("./controllers");

const router = express.Router();

//=== param middleware (parameter) ====\\
router.param("noteId", async (req, res, next, noteId) => {
  const note = await fetchNote(noteId, next);
  if (note) {
    req.note = note;
    next();
  } else {
    const error = new Error("Note Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", noteFetch);

// Create Route
//router.post("/", createNote);

// Delete Route
router.delete("/:noteId", deleteNote);

// Update Route
//router.put("/:noteId", updateNote);

module.exports = router;
