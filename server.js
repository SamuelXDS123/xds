const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/entrada')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Criação do Schema e Model para Entradas
const entradaSchema = new mongoose.Schema({
    chaveNF: String,
    notaFiscal: String,
    carga: String,
    destinatario: String,
});

const Entrada = mongoose.model('Entrada', entradaSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para adicionar uma nova entrada
app.post('/api/entradas', async (req, res) => {
    const { chaveNF, notaFiscal, carga, destinatario } = req.body;

    const novaEntrada = new Entrada({
        chaveNF,
        notaFiscal,
        carga,
        destinatario,
    });

    try {
        await novaEntrada.save();
        res.status(201).send(novaEntrada);
    } catch (error) {
        console.error('Erro ao salvar a entrada:', error);
        res.status(500).send({ error: 'Erro ao salvar a entrada' });
    }
});

// Rota para obter todas as entradas
app.get('/api/entradas', async (req, res) => {
    try {
        const entradas = await Entrada.find();
        res.status(200).send(entradas);
    } catch (error) {
        console.error('Erro ao buscar entradas:', error);
        res.status(500).send({ error: 'Erro ao buscar entradas' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
