const { Notebook, Note } = require("../../db/models");

exports.fetchNotebook = async (notebookId, next) => {
  try {
    const notebook = await Notebook.findByPk(notebookId);
    return notebook;
  } catch (error) {
    next(error);
  }
};

exports.notebookFetch = async (req, res, next) => {
  try {
    const notebooks = await Notebook.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Note,
        as: "notes",
        attributes: ["id", "title"],
      },
    });
    res.json(notebooks);
  } catch (error) {
    next(error);
  }
};

exports.createNotebook = async (req, res, next) => {
  try {
    const newNotebook = await Notebook.create(req.body);
    // response: 201 CREATED
    res.status(201).json(newNotebook);
  } catch (error) {
    next(error);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    req.body.notebookId = req.notebook.id;
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
