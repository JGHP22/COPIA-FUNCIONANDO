import Client from "./clientModel.js";
import Book from "./bookModel.js";
import Loan from "./loanModel.js";

const configAssociations = () => {    
    Client.hasMany(Loan, { foreignKey: 'id_client' });
    Loan.belongsTo(Client, { foreignKey: 'id_client' });

    Book.hasMany(Loan, { foreignKey: 'id_book' });
    Loan.belongsTo(Book, { foreignKey: 'id_book' });
};

export { Client, Book, Loan, configAssociations };