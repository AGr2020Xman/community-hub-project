const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

class User extends Model {
    static getFullName() {
        return [this.firstname, this.lastName].join(' ');
    }
}

User.init({
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[a-z]+$/i,
            max: 25
        }
    },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[a-z]+$/i,
            max: 25
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true
        }
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        max: 20
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            max: 128
        }
    },
    uniqueIdentifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    }
},
{
    hooks: {
        beforeCreate: (user, options) => {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    }
},
{
    sequelize,
    modelName: 'User'
});





