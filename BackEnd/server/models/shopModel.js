const pool = require('../util/db');

module.exports = {
  search: async (
    keyword,
    type,
    plug,
    wifi,
    smoking_area,
    cat,
    dog,
    min_order,
    time_limit,
  ) => {
    let basicQuery = `SELECT shops.id, shop_name, primary_image,
    address, operating_status, 
    GROUP_CONCAT(
      '{ "icon": "', seats.icon, '", "type": "', seats.type,
      '", "available_seats": ', seats.available_seats,
      ', "total_seats": ', seats.total_seats, ' }'
    ) AS seat_info
    FROM shops
    LEFT JOIN seats ON shops.id = seats.cafe_id
    WHERE is_published = true`;
    try {
      if (keyword) {
        basicQuery += ` AND (shop_name LIKE '%${keyword}%' OR address LIKE '%${keyword}%')`;
      }
      if (type) {
        basicQuery += ` AND shops.type = "${type}"`;
      }
      if (plug) {
        basicQuery += ` AND plug = true`;
      }
      if (wifi) {
        basicQuery += ` AND wifi = true`;
      }
      if (smoking_area) {
        basicQuery += ` AND smoking_area = true`;
      }
      if (cat) {
        basicQuery += ` AND cat = true`;
      }
      if (dog) {
        basicQuery += ` AND dog = true`;
      }
      if (min_order) {
        basicQuery += ` AND min_order > ${min_order}`;
      }
      if (time_limit) {
        basicQuery += ` AND time_limit = true`;
      }
      basicQuery += ` GROUP BY shops.id;`;
      const [result] = await pool.query(basicQuery);
      return result;
    } finally {
      await pool.releaseConnection();
    }
  },
  getBasicInfo: async (cafeId) => {
    try {
      const query = `
      SELECT shops.id, shop_name, type, introduction, opening_hour, closing_hour, 
      primary_image, secondary_image_1, secondary_image_2, address, telephone, facebook, ig, line, 
      rules, service_and_equipment, 
      DATE_FORMAT(menu_last_updated, "%Y-%m-%d %H:%i:%s") AS menu_last_updated, 
      menus.category, 
      GROUP_CONCAT(CONCAT(menus.item, '$', menus.price)) AS menu_items
      FROM shops
      INNER JOIN menus ON shops.id = menus.cafe_id
      WHERE shops.id = ? AND is_published = true
      GROUP BY shops.id, menus.category`;
      const [result] = await pool.query(query, cafeId);
      return result;
    } finally {
      await pool.releaseConnection();
    }
  },
  getCurrentStatus: async (cafeId) => {
    try {
      const query = `
      SELECT DATE_FORMAT(status_last_updated, "%Y-%m-%d %H:%i:%s") AS status_last_updated, 
      operating_status, icon, seats.type, available_seats, total_seats
      FROM shops
      INNER JOIN seats ON shops.id = seats.cafe_id
      WHERE shops.id = ? AND is_published = true`;
      const [result] = await pool.query(query, cafeId);
      return result;
    } finally {
      await pool.releaseConnection();
    }
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
