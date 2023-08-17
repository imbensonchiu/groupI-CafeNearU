const pool = require('../util/db');

module.exports = {
  createWishList: async () => {
    const query = '';
    try {
      await pool.query(query, []);
    } finally {
      pool.releaseConnection();
    }
  },
  getWishList: async () => {
    const query = '';
    try {
      await pool.query(query, []);
    } finally {
      pool.releaseConnection();
    }
  },
  addCafeToWishList: async () => {
    const query = '';
    try {
      await pool.query(query, []);
    } finally {
      pool.releaseConnection();
    }
  },
  deleteCafeFromWishList: async () => {
    const query = '';
    try {
      await pool.query(query, []);
    } finally {
      pool.releaseConnection();
    }
  },
  getCafeFromWishList: async () => {
    const query = '';
    try {
      await pool.query(query, []);
    } finally {
      pool.releaseConnection();
    }
  },
};
