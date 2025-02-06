const mysql = require('mysql2');

// Configuração do pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',           // Substitua pelo endereço do seu banco de dados
  user: 'root',                // Substitua pelo usuário do MySQL
  password: '',                // Substitua pela senha do MySQL
  database: 'sistema_xds2',    // Substitua pelo nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,         // Número máximo de conexões simultâneas
  queueLimit: 0,               // Sem limite para fila de conexões
});

// Exporta o pool para ser usado em outros arquivos
module.exports = pool.promise();
