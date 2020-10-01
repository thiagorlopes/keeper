module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("note", {
    /*userId: {
      type: Sequelize.STRING,
    },
    noteId: {
      type: Sequelize.STRING,
    },*/
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
  });

  return Note;
};
