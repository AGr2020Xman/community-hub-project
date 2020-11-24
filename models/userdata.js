const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('geo_verse_db', 'root', 'H0n@s0up1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});

sequelize.authenticate().then((err)=>{
    console.log('Connection Successful');
}).catch((err)=>{
    console.log('Unable to connect to db', err);
})

class User extends Model {
    static getFullName() {
        return [this.firstname, this.lastName].join(' ');
    }
};

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
    sequelize: 'sequelize',
    modelName: 'User'
});

console.log(User === sequelize.models.User);

module.exports = sequelize;



