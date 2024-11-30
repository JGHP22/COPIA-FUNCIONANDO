import { configAssociations } from '../models/associations.js';
import { loanBook, returnBook, popularBooks, pendentClients } from "../controllers/loanController.js";
import { Router } from "express";

configAssociations();
const loanRouter = Router();

// Fazer emprestimo (POST)
loanRouter.post('/:email/:code_bar', loanBook);

// Devolver livro (PUT)
loanRouter.put('/:email/:code_bar', returnBook);

// Listar livros populares (GET)
loanRouter.get('/popularBooks', popularBooks);

// Listar clientes com pendências (GET)
loanRouter.get('/pendentClients', pendentClients);

export default loanRouter;