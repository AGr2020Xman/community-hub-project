const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Geo extends Model {
    static associate(models) {
      Geo.hasMany(models.Community, { onDelete: 'CASCADE' });
    }
  }
  Geo.init(
    {
      name: {
        type: DataTypes.ENUM(
          'Paris',
          'Tokyo',
          'London',
          'Sydney',
          'Vancouver',
          'Perth',
          'Rome',
          'Geneva',
          'Amsterdam',
          'Brisbane'
        ),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      hooks: {},
      sequelize,
      modelName: 'Geo',
    }
  );
  return Geo;
};
