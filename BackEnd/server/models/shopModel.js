const pool = require('../util/db');

module.exports = {
  search: () => {
    return 'search';
  },
  getBasicInfo: () => {
    return 'get basic info';
  },
  getCurrentStatus: () => {
    return 'get current status';
  },
  createComment: async (
    context,
    cafe_id,
    customer_id,
    average_total_rating,
    average_cleanliness,
    average_service,
    average_food,
    average_wifi,
    average_atmosphere,
    is_quiet,
  ) => {
    const query =
      'INSERT INTO `comments` (`context`, `cafe_id`, `customer_id`, `average_total_rating`, `average_cleanliness`, `average_service`, `average_food`, `average_wifi`, `average_atmosphere`, `is_quiet`,`created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CONVERT_TZ(NOW(), "UTC", "Asia/Taipei"))';
    try {
      return await pool.query(query, [
        context,
        cafe_id,
        customer_id,
        average_total_rating,
        average_cleanliness,
        average_service,
        average_food,
        average_wifi,
        average_atmosphere,
        is_quiet,
      ]);
    } finally {
      pool.releaseConnection();
    }
  },
  deleteComment: async (comment_id) => {
    const query = 'DELETE FROM `comments` WHERE `id` = ?';
    try {
      return await pool.query(query, [comment_id]);
    } finally {
      pool.releaseConnection();
    }
  },
  checkCommentExist: async (comment_id) => {
    const query = 'SELECT `id` FROM `comments` WHERE `id` = ?';
    try {
      const [result] = await pool.query(query, [comment_id]);
      return result[0];
    } finally {
      pool.releaseConnection();
    }
  },
  getComments: () => {
    return 'get all comment';
  },
};
