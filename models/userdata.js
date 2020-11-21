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
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        }
    },
    uniqueIdentifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    }

},
{
    sequelize,
    modelName: 'User'
});




