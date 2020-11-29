const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcrypt');

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

    class myPage extends Model {
        static associate(models) {
            myPage.belongsTo(models.User, { as: 'createdPage', onDelete: 'CASCADE' }),
            myPage.belongsTo(models.Community, { as: 'sites', onDelete: 'CASCADE' })
        }
    }
    myPage.init(
        {
           myPage: {
               type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                unique: true
           },
           name: {
               type: DataTypes.STRING,
               unique: true,
               max: 250
           },
        },
        {
            hooks: {},
            sequelize,
            modelName: 'myPage',
        }
    );
    return myPage
  };