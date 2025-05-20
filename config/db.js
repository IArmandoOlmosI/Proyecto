require('dotenv').config();
const mysql = require('mysql2');

// Configuración flexible que acepta ambos formatos
const config = process.env.MYSQL_URL 
  ? { // Si existe MYSQL_URL, la parseamos
      uri: process.env.MYSQL_URL,
      ssl: { rejectUnauthorized: false }
    }
  : { // Si no, usamos las variables separadas
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT || 3306,
      ssl: { rejectUnauthorized: false }
    };

const pool = mysql.createPool(config);

// El resto del código igual...
pool.getConnection((err, connection) => {
  if (err) console.error('Error de conexión:', err);
  else {
    console.log('Conectado a MySQL');
    connection.release();
  }
});

module.exports = pool;
