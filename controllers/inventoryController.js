const db = require('../config/db');

// Obter todos os itens do inventário
exports.getInventory = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM inventory');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter inventário' });
  }
};

// Adicionar um novo item ao inventário
exports.addItem = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    await db.query('INSERT INTO inventory (name, quantity) VALUES (?, ?)', [name, quantity]);
    res.status(201).json({ message: 'Item adicionado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar item' });
  }
};

// Excluir um item do inventário
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM inventory WHERE id = ?', [id]);
    res.status(200).json({ message: 'Item excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir item' });
  }
};
