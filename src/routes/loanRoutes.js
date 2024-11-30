import { configAssociations } from '../models/associations.js';
import { listClients, searchClient, createClient, updateClient, deleteClient } from "../controllers/clientController.js";
import { Router } from "express";

configAssociations();
const clientRouter = Router();

// Listar livros (GET)
clientRouter.get('/', listClients);

// Buscar livro por email (GET)
clientRouter.get('/:email', searchClient);

// Criar livro (POST)
clientRouter.post('/', createClient);

// Atualizar livro por email (PUT)
clientRouter.put('/:email', updateClient);

// Deletar livro por email (DELETE)
clientRouter.delete('/:email', deleteClient);

export default clientRouter;