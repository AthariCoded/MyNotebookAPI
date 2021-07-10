const { Note, Notebook } = require("../../db/models");

exports.fetchNote = async (noteId, next) => {
  try {
    const note = await Note.findByPk(noteId);
    return note;
  } catch (error) {
    next(error);
  }
};

//================================\\

exports.noteFetch = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Notebook,
        as: "notebook",
        attributes: ["name"],
      },
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await req.note.destroy();
    res.status(204).end(); // NO Content
  } catch (error) {
    next(error);
  }
};

/*
exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const foundNote = await Note.findByPk(noteId);
    if (foundNote) {
      await foundNote.destroy();
      res.status(204).end(); //NO CONTENT
    } else {
      res.status(404).json({ message: "Note Not Found." });
    }
  } catch (error) {
    next(error);
  }
};
*/
