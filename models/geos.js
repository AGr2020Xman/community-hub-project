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
  class Geo extends Model {
    static associate(models) {
      Geo.hasMany(models.Community, { foreignKey: 'communityId', as: 'communities' });
    }
  }
  Geo.init(
    {
      name: {
        type: DataTypes.STRING,
        max: 50,
        unique: true,
        allowNull: false,
      },
    },
    {
      hooks: {},
      sequelize,
      modelName: 'Geo',
    }
  );
  return Geo;
};
