import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Client = sequelize.define('Clients', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            isEmail: true,
        },
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        validate: {
            is: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/i,
        },
    },
});

export default Client;