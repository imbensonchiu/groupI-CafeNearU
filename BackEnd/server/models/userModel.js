const pool = require('../util/db');

module.exports = {
  insertNewUser: async (name, email, hashedPassword, identity) => {
    const query =
      'INSERT INTO `customers` (name, email, password, identity) VALUES (?, ?, ?, ?)';
    try {
      return await pool.query(query, [name, email, hashedPassword, identity]);
    } finally {
      pool.releaseConnection();
    }
  },
  getUserByEmail: async (email) => {
    const query = 'SELECT * FROM `customers` WHERE `email` = ?';
    try {
      const [result] = await pool.query(query, [email]);
      return result[0];
    } finally {
      pool.releaseConnection();
    }
  },
  getUserById: async (id) => {
    const query = 'SELECT * FROM `customers` WHERE `id` = ?';
    try {
      const [result] = await pool.query(query, [id]);
      return result[0];
    } finally {
      pool.releaseConnection();
    }
  },
};
