const pool = require('../util/db');

module.exports = {
  createWishList: async (customer_id, wishlist_name) => {
    const query = 'INSERT INTO wishlists (customer_id, name) VALUES (?, ?)';
    try {
      return await pool.query(query, [customer_id, wishlist_name]);
    } finally {
      pool.releaseConnection();
    }
  },
  getWishList: async () => {
    const query = ``;
    try {
      await pool.query(query, []);
    } finally {
      pool.releaseConnection();
    }
  },
  addCafeToWishList: async (wishlist_id, cafe_id) => {
    const query = `INSERT INTO wishlist_items (wishlist_id, cafe_id) VALUES (?, ?)`;
    try {
      return await pool.query(query, [wishlist_id, cafe_id]);
    } finally {
      pool.releaseConnection();
    }
  },
  deleteCafeFromWishList: async (wishlist_id, cafe_id) => {
    const query = `DELETE FROM wishlist_items WHERE wishlist_id = ? AND cafe_id = ?`;
    try {
      return await pool.query(query, [wishlist_id, cafe_id]);
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
  isCafeInWishlist: async (wishlist_id, cafe_id) => {
    const query =
      'SELECT COUNT(*) AS count FROM wishlist_items WHERE wishlist_id = ? AND cafe_id = ?';
    try {
      const [result] = await pool.query(query, [wishlist_id, cafe_id]);
      return result[0].count > 0;
    } finally {
      pool.releaseConnection();
    }
  },
};
