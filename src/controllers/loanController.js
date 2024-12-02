import { Op, Sequelize } from "sequelize"
import { Loan, Book } from "../models/associations.js"
import { emailToId } from "./clientController.js"
import { code_barToId} from "./bookController.js"

//loanBook() => criar um registro na tabela Loan
async function loanBook(req, res) {
    try {
        const { email, code_bar } = req.body;
        const id_client = await emailToId(email);
        console.log("O id do cliente é:" + id_client);
        const id_book = await code_barToId(code_bar);
        console.log("O id do livro é:" + id_book);
        const COUNT = await Loan.count({ where:{ return_date: [Op.isNull], id_client: id_client, }});
        console.log(COUNT);
    if(COUNT >= 3){
            return res.status(400).json({ message: "The client cannot make a loan, reason: limit of borrowed books reached." });
    }
        const loan_date = new Date();
        const due_date = new Date();
        due_date.setDate(due_date.getDate()+14);
        const NEWLOAN = await Loan.create({ id_client, id_book, loan_date, due_date});
        res.status(201).json(NEWLOAN);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//returnBook() => devolver um livro
async function returnBook(req, res) {
    try {
        const { email, code_bar } = req.body;
        const ID_CLIENT = await emailToId(email);
        const ID_BOOK = await code_barToId(code_bar);
        const TARGETLOAN = await Loan.findOne({where:{id_client: ID_CLIENT, id_book: ID_BOOK}});
    if (!TARGETLOAN){
        return res.status(404).json({ message: "Loan not found" });
    }
        const RETURN_DATE = new Date();
        await TARGETLOAN.update({return_date: RETURN_DATE});
        res.status(200).json(TARGETLOAN);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//popularBooks() => devolver uma lista em ordem decrescente da quantidade de emprestimo de cada livro
async function popularBooks(req, res) {
    try {
        const POPULARBOOKS = await Loan.findAll({
            attributes: [
              'id_book',
              [Sequelize.fn('COUNT', Sequelize.col('id_book')), 'total_loans'],
            ],
            include: [{
              model: Book,
              attributes: ['title'],
              required: true,
            }],
            group: ['id_book', 'Book.title'],
            order: [[Sequelize.literal('total_loans'), 'DESC']],
            raw: true,
        });
        res.status(200).json(POPULARBOOKS);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//pendentClients() => devolver uma lista dos clientes com emprestimos pendentes.
async function pendentClients(req, res) {
    try {
        const PENDENTCLIENTS = await Loan.findAll({where:{ date_return: [Op.isNull]}});
        res.status(200).json(PENDENTCLIENTS);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export { loanBook, returnBook, popularBooks, pendentClients };