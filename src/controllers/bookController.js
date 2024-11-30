import { Book } from "../models/associations.js"

//listBooks() => todos os registros da tabela livro
async function listBooks(req, res) {
    try {
        const BOOKLIST = await Book.findAll();
        res.status(200).json(BOOKLIST);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// code_barToId(cod_bar) => retorna o id do livro com o código de barras informado
async function code_barToId(req, res) {
    try {
        const { CODE_BAR } = req.params;
        const TARGETBOOK = await Book.findOne({ where: { code_bar: CODE_BAR } });

        if (!TARGETBOOK) {
            return res.status(404).json({ message: "Book not found" });
        }

        return TARGETBOOK.id;
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

//createBook() => criar um registro na tabela livro
async function createBook(req, res) {
    try {
        const { CODE_BAR, TITLE, AUTHOR, LAUNCH_DATE } = req.body;
        const NEWBOOK = await Book.create({ CODE_BAR, TITLE, AUTHOR, LAUNCH_DATE });
        res.status(201).json(NEWBOOK);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//searchBook(id) => retornar um registro pelo id dele
async function searchBook(req, res) {
    try {
        const id = await code_barToId(req, res);
        const TARGETBOOK = await Book.findByPk(id);

        if (!TARGETBOOK) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(TARGETBOOK);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//updateBook(id) => atualiza livro
async function updateBook(req, res) {
    try {
        const id = await code_barToId(req, res);
        const UPDATEBOOK = await Book.findOne({ where: { id } });

        if (!UPDATEBOOK) {
            return res.status(404).json({ message: "Book not found" });
        }

        const { CODE_BAR, TITLE, AUTHOR, LAUNCH_DATE } = req.body;
        await UPDATEBOOK.update({ CODE_BAR, TITLE, AUTHOR, LAUNCH_DATE });

        res.status(200).json(UPDATEBOOK);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//deleteBook(id) => exclui o registro
async function deleteBook(req, res) {
    try {
        const id = await code_barToId(req, res);
        const DELETEBOOK = await Book.findOne({ where: { id } });

        if (!DELETEBOOK) {
            return res.status(404).json({ message: "Book not found" });
        }

        await DELETEBOOK.destroy();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { listBooks, createBook, code_barToId, searchBook, updateBook, deleteBook};