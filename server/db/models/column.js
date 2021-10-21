const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    static associate({ Board, Task }) {
      this.belongsTo(Board, { foreignKey: 'boardId' });
      this.hasMany(Task, { foreignKey: 'columnId' });
    }
  }
  Column.init({
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Column',
    timestamps: false,
  });
  return Column;
};
