const { Sequelize, Model, NOW } = require('sequelize');
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
  class User extends Model {
    static associate(models) {
      User.hasMany(models.myPage, { as: 'createdPages', onDelete: 'CASCADE' });
    }
  }
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
            msg: 'A name is required.',
          },
        },
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'A last name is required.',
          },
          is: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/i,
          max: 25,
          notNull: {
            msg: 'A last name is required.',
          },
        },
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
          notEmpty: {
            msg: 'A nickname is required.',
          },
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
          console.log('should be hashed', user.password);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
