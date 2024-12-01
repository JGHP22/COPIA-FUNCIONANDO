import { Client } from "../models/associations.js"

//listClients() => todos os registros da tabela Clients
async function listClients(req, res) {
    try {
        const CLIENTLIST = await Client.findAll();
        res.status(200).json(CLIENTLIST);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//emailToId(email) => retorna o id do Clients com o email informado
async function emailToId(email) {
    try {
        const TARGETCLIENT = await Client.findOne({ where: { email: email } });

        if (!TARGETCLIENT) {
            return res.status(404).json({ message: "Client not found" });
        }

        return TARGETCLIENT.id;
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

//createClient() => criar um registro na tabela Clients
async function createClient(req, res) {
    try {
        const { email, name, phone } = req.body;
        const NEWCLIENT = await Client.create({ email, name, phone });
        res.status(201).json(NEWCLIENT);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//searchClient(id) => retornar um Client pelo id dele
async function searchClient(req, res) {
    try {
        const id = await emailToId(req.params.email);
        const TARGETCLIENT = await Client.findByPk(id);

        if (!TARGETCLIENT) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(TARGETCLIENT);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

//updateClient(id) => atualiza Clients
async function updateClient(req, res) {
    try {
        const id = await emailToId(req.params.email);
        const UPDATECLIENT = await Client.findByPk(id);

        if (!UPDATECLIENT) {
            return res.status(404).json({ message: "Client not found" });
        }
        
        const { email, name, phone } = req.body;
        await UPDATECLIENT.update({ email: email, name: name, phone: phone });

        res.status(200).json(UPDATECLIENT);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//deleteClient(id) => exclui o registro
async function deleteClient(req, res) {
    try {
        const id = await emailToId(req.params.email);
        const DELETECLIENT = await Client.findByPk(id);

        if (!DELETECLIENT) {
            return res.status(404).json({ message: "Client not found" });
        }

        await DELETECLIENT.destroy();
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { listClients, emailToId, createClient, searchClient, updateClient, deleteClient };