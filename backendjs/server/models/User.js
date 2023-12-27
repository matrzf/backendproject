const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Users extends Model {}

Users.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        message:{
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: connection,
        modelName: 'Users',
    },
);

module.exports = Users;