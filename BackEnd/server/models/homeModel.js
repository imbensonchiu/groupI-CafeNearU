const pool = require('../util/db');

module.exports = {
  getHomepage: async () => {
    try {
      const num = 2;
      const query = `(SELECT shops.id, shop_name, primary_image, operating_status, min_order,
        GROUP_CONCAT(
        '{ "icon": "', seats.icon, '", "type": "', seats.type,
        '", "available_seats": ', seats.available_seats,
        ', "total_seats": ', seats.total_seats, ' }'
      ) AS seat_info
      FROM shops
      LEFT JOIN seats ON shops.id = seats.cafe_id
      WHERE is_published = true AND shops.type = "休閒"
      ORDER BY RAND()
      LIMIT ${num})
      UNION ALL
      (SELECT shops.id, shop_name, primary_image, operating_status, min_order,
        GROUP_CONCAT(
        '{ "icon": "', seats.icon, '", "type": "', seats.type,
        '", "available_seats": ', seats.available_seats,
        ', "total_seats": ', seats.total_seats, ' }'
      ) AS seat_info
      FROM shops
      LEFT JOIN seats ON shops.id = seats.cafe_id
      WHERE is_published = true AND shops.type = "寵物"
      ORDER BY RAND()
      LIMIT ${num})
      UNION ALL
      (SELECT shops.id, shop_name, primary_image, operating_status, min_order,
        GROUP_CONCAT(
        '{ "icon": "', seats.icon, '", "type": "', seats.type,
        '", "available_seats": ', seats.available_seats,
        ', "total_seats": ', seats.total_seats, ' }'
      ) AS seat_info
      FROM shops
      LEFT JOIN seats ON shops.id = seats.cafe_id
      WHERE is_published = true AND shops.type = "工作"
      ORDER BY RAND()
      LIMIT ${num})`;
      const [result] = await pool.query(query);
      console.log(result);
    } finally {
      pool.releaseConnection();
    }
  },
};
