require('dotenv').config();
const mysql = require('mysql2');

// Creamos un pool de conexiones en lugar de una conexión individual
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  ssl: { 
    rejectUnauthorized: false,
  },
  waitForConnections: true,
});

// Con un pool no usamos connect() directamente
// En su lugar, podemos verificar la conexión así:
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('Conexión exitosa a MySQL');
  // Liberamos la conexión
  connection.release();
});

// Solo exportamos el pool
module.exports = pool;