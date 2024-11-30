import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";
import { Book, Client } from "./associations.js";

const Loan = sequelize.define('Loans', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    id_client:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: Client,
            key: 'id'
        }
    },
    id_book:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: Book,
            key: 'id'
        }
    },
    loan_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    due_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    return_date:{
        type: DataTypes.DATE,
        allowNull: true,
    },
});

export default Loan;
