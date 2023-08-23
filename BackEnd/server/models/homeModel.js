const pool = require('../util/db');

module.exports = {
  getHomepage: async (userId, type) => {
    try {
      const num = 2;
      // 要把 is_published = true AND 加回去
      // 考慮把控制回傳商店數的 num 向上移動一層
      let result;
      if (userId) {
        const query = `SELECT shops.id, shop_name, primary_image, operating_status, min_order, 
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('icon', seats.icon, 'type', seats.type, 
                            'available_seats', seats.available_seats, 'total_seats', seats.total_seats)
            ) FROM seats WHERE seats.cafe_id = shops.id
        ) AS seat_info, 
        IF(
          (SELECT wishlists.id FROM wishlists 
          LEFT JOIN wishlist_items 
          ON wishlists.id = wishlist_items.wishlist_id 
          WHERE wishlist_items.cafe_id = shops.id AND customer_id = ? ) > 0, true, false) AS wishlist_item
        FROM shops
        WHERE shops.type = '${type}'
        ORDER BY RAND()
        LIMIT ${num}`;
        [result] = await pool.query(query, [userId, userId, userId]);
      } else {
        const query = `SELECT * FROM (
          SELECT shops.id, shop_name, primary_image, operating_status, min_order, 
              (
                  SELECT JSON_ARRAYAGG(
                      JSON_OBJECT('icon', seats.icon, 'type', seats.type, 
                                  'available_seats', seats.available_seats, 'total_seats', seats.total_seats)
                  ) FROM seats WHERE seats.cafe_id = shops.id
              ) AS seat_info
          FROM shops
          WHERE shops.type = '休閒'
          ORDER BY RAND()
          LIMIT 2
      ) AS leisure_shops
      UNION ALL
      SELECT * FROM (
          SELECT shops.id, shop_name, primary_image, operating_status, min_order, 
              (
                  SELECT JSON_ARRAYAGG(
                      JSON_OBJECT('icon', seats.icon, 'type', seats.type, 
                                  'available_seats', seats.available_seats, 'total_seats', seats.total_seats)
                  ) FROM seats WHERE seats.cafe_id = shops.id
              ) AS seat_info
          FROM shops
          WHERE shops.type = '工作'
          ORDER BY RAND()
          LIMIT 2
      ) AS work_shops
      UNION ALL
      SELECT * FROM (
          SELECT shops.id, shop_name, primary_image, operating_status, min_order, 
              (
                  SELECT JSON_ARRAYAGG(
                      JSON_OBJECT('icon', seats.icon, 'type', seats.type, 
                                  'available_seats', seats.available_seats, 'total_seats', seats.total_seats)
                  ) FROM seats WHERE seats.cafe_id = shops.id
              ) AS seat_info
          FROM shops
          WHERE shops.type = '寵物'
          ORDER BY RAND()
          LIMIT 2
      ) AS pet_shops;`;
        [result] = await pool.query(query);
      }
      return result;
    } finally {
      pool.releaseConnection();
    }
  },
};
