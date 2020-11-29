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

    class User extends Model {}
    User.init(
        {
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/i,
                max: 25,
                notNull: {
                    msg: 'A name is required.'
                },
            }
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/i,
                max: 25,
                notNull: {
                    msg: 'A last name is required.'
                }
            }
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        },
        nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        max: 20,
        validate: {
          notEmpty: true,
        },
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'A password is required.',
          },
          is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          max: 128,
        },
        },
        uniqueIdentifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10, null);
          user.fullName = user.firstName + ' ' + user.lastName;
        },
        beforeUpdate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10, null);
        }
      },
      sequelize,
      modelName: 'User',
    }
  )
  return User;
};
