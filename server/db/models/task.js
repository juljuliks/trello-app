const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ Column }) {
      this.belongsTo(Column, { foreignKey: 'columnId', onDelete: 'CASCADE' });
    }
  }
  Task.init({
    columnId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Task',
    timestamps: false,
  });
  return Task;
};
