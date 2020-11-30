const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    static associate(models) {
      Community.belongsTo(models.Geo);
    }
  }
  Community.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      hooks: {},
      sequelize,
      modelName: 'Community',
    }
  );
  return Community;
};
