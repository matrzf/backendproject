const { Model, Datatypes } =  require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class user extends Model {}

user.init(
    {
        email:{
            type: Datatypes.STRING,
            unique:true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,32}/,
            },
        },
        connected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        dob: DataTypes.DATE,
    },
    {
        sequelize: connection,
    }
);

user.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10)); // hashage password
  });
  
  user.addHook("beforeUpdate", async (user, options) => {
    if (options.fields.includes("password")) {
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10)); // hashage password
    }
  });
  
  module.exports = user;