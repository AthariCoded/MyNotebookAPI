const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define("Note", {
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING, unique: true },
  });

  SequelizeSlugify.slugifyModel(Note, { source: ["title"] });
  return Note;
};
