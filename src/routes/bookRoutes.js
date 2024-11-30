import { configAssociations } from '../models/associations.js';
import { listBooks, searchBook, createBook, updateBook, deleteBook } from "../controllers/bookController.js";
import { Router } from "express";

configAssociations();
const bookRouter = Router();

// Listar livros (GET)
bookRouter.get('/', listBooks);

// Buscar livro por code_bar (GET)
bookRouter.get('/:code_bar', searchBook);

// Criar livro (POST)
bookRouter.post('/', createBook);

// Atualizar livro por code_bar (PUT)
bookRouter.put('/:code_bar', updateBook);

// Deletar livro por code_bar (DELETE)
bookRouter.delete('/:code_bar', deleteBook);

export default bookRouter;
