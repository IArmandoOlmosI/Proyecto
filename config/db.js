const mysql = require('mysql2/promise'); // Usa la versión Promise

const config = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);

// Prueba de conexión
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('Conexión a MySQL exitosa!');
    conn.release();
  } catch (err) {
    console.error('Error de conexión:', err);
  }
}

testConnection();

module.exports = pool;
