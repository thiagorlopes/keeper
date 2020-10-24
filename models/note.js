module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("note", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  });

  return Note;
};
