import Client from "./clientModel.js";
import Book from "./bookModel.js";
import Loan from "./loanModel.js";

const configAssociations = () => {    
    Client.hasMany(Loan, { foreignKey: 'id' });
    Loan.belongsTo(Client, { foreignKey: 'id' });
    Book.hasMany(Loan, { foreignKey: 'id' });
    Loan.belongsTo(Book, { foreignKey: 'id' });
};
export { Client, Book, Loan, configAssociations };