import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Book = sequelize.define('Books', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    code_bar:{
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
    },
    launch_date:{
        type: DataTypes.DATE,
    }
});

export default Book;
