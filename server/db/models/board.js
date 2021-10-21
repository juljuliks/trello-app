const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate({ User, Column }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Column, { foreignKey: 'boardId', onDelete: 'CASCADE' });
    }
  }
  Board.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Board',
    timestamps: false,
  });
  return Board;
};
