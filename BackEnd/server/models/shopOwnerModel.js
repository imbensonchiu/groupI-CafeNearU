const pool = require('../util/db');

module.exports = {
  basicInfoUpdate: async (arr, rules, service_and_equipment) => {
    // 要先檢查用戶是否存在
    // 要追加一個條件 update wherer id = 用戶 id
    const query = `UPDATE shops SET shop_name = ?, type = ?, introduction = ?, opening_hour = ?, closing_hour = ?, address = ?, telephone = ?, facebook = ?, ig = ?, line = ?, time_limit = ?, min_order = ?, plug = ?, wifi = ?, smoking_area = ?, dog = ?, cat = ?, primary_image = ?, secondary_image_1 = ?, secondary_image_2 = ? WHERE id = 1`;
    const findRules = `SELECT id FROM rules WHERE cafe_id = ?`;
    const deleteRules = `DELETE FROM rules WHERE cafe_id = ?`;
    const insertRules = `INSERT INTO rules (type, heading, content, cafe_id) VALUES (?, ?, ?, ?)`;
    const findServiceAndEquip = `SELECT id FROM service_and_equipment WHERE cafe_id = ?`;
    const deleteServiceAndEquip = `DELETE FROM service_and_equipment WHERE cafe_id = ?`;
    const insertServiceAndEquip = `INSERT INTO service_and_equipment (icon, type, content, cafe_id) VALUES (?, ?, ?, ?)`;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(query, arr);
      const [hasRules] = await conn.query(findRules, 1 /*模擬的用戶id*/); // if 沒找到，直接 insert，else 找到 先刪再 insert
      if (hasRules.length !== 0) {
        console.log('Delete Rules');
        await conn.query(deleteRules, 1 /*模擬的用戶id*/);
      }
      for (let i = 0; i < rules.length; i++) {
        await conn.query(insertRules, [
          rules[i].type,
          rules[i].heading,
          rules[i].content,
          1, // 這是模擬的 cafe_id
        ]);
      }
      const [hasServiceAndEquip] = await conn.query(
        findServiceAndEquip,
        1 /*模擬的用戶id*/,
      ); // if 沒找到，直接 insert，else 找到 先刪再 insert
      if (hasServiceAndEquip.length !== 0) {
        console.log('Delete Service and Equip');
        await conn.query(deleteServiceAndEquip, 1 /*模擬的用戶id*/);
      }
      for (let i = 0; i < service_and_equipment.length; i++) {
        await conn.query(insertServiceAndEquip, [
          service_and_equipment[i].icon,
          service_and_equipment[i].type,
          service_and_equipment[i].content,
          1, // 這是模擬的 cafe_id
        ]);
      }
      await conn.commit();
      console.log('Transaction committed.');
    } catch (error) {
      await conn.rollback();
      console.error('Transaction rolled back:', error);
    } finally {
      pool.releaseConnection();
    }
  },
  menuUpdate: async () => {
    return 'menu update';
  },
  statusUpdate: () => {
    return 'status update';
  },
  setSeatType: () => {
    return 'seat type update';
  },
  profilePub: () => {
    return 'profile publish';
  },
  profileUnpub: () => {
    return 'profile unpublish';
  },
};
