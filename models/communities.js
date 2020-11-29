const { Model } = require('sequelize');

// const sequelize = new Sequelize('geo_verse_db', 'root', 'H0n@s0up1234', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
// });

// sequelize.authenticate().then((err)=>{
//     console.log('Connection Successful');
// }).catch((err)=>{
//     console.log('Unable to connect to db', err);
// })

module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    static associate(models) {
      Community.belongsTo(models.Geo, { foreignKey: 'containingGeoId', as: 'geo' });
    }
  }
  Community.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {},
      sequelize,
      modelName: 'Community',
    }
  );
  return Community;
};
