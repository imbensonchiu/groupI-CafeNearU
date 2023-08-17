const pool = require('../util/db');

module.exports = {
  insertNewShoper: async (name, email, hashedPassword) => {
    const query =
      'INSERT INTO `shops` (user_name, email, password) VALUES (?, ?, ?)';
    try {
      return await pool.query(query, [name, email, hashedPassword]);
    } finally {
      pool.releaseConnection();
    }
  },
  getByEmail: async (email) => {
    const query = 'SELECT * FROM `shops` WHERE `email` = ?';
    try {
      const [result] = await pool.query(query, [email]);
      return result[0];
    } finally {
      pool.releaseConnection();
    }
  },
  getByID: async (id) => {
    const query = 'SELECT * FROM `shops` WHERE `id` = ?';
    try {
      const [result] = await pool.query(query, [id]);
      return result[0];
    } finally {
      pool.releaseConnection();
    }
  },
  basicInfoUpdate: async (userId, arr, rules, service_and_equipment) => {
    const insertBasicInfo = `UPDATE shops SET shop_name = ?, type = ?, introduction = ?, opening_hour = ?, closing_hour = ?, address = ?, telephone = ?, facebook = ?, ig = ?, line = ?, time_limit = ?, min_order = ?, plug = ?, wifi = ?, smoking_area = ?, dog = ?, cat = ?, primary_image = ?, secondary_image_1 = ?, secondary_image_2 = ? WHERE id = ?`;
    const findRules = `SELECT id FROM rules WHERE cafe_id = ?`;
    const deleteRules = `DELETE FROM rules WHERE cafe_id = ?`;
    const insertRules = `INSERT INTO rules (type, heading, content, cafe_id) VALUES (?, ?, ?, ?)`;
    const findServiceAndEquip = `SELECT id FROM service_and_equipments WHERE cafe_id = ?`;
    const deleteServiceAndEquip = `DELETE FROM service_and_equipments WHERE cafe_id = ?`;
    const insertServiceAndEquip = `INSERT INTO service_and_equipments (icon, type, content, cafe_id) VALUES (?, ?, ?, ?)`;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(insertBasicInfo, [...arr, userId]);
      const [hasRules] = await conn.query(findRules, userId);
      if (hasRules.length !== 0) {
        console.log('Delete Rules');
        await conn.query(deleteRules, userId);
      }
      for (let i = 0; i < rules.length; i++) {
        await conn.query(insertRules, [
          rules[i].type,
          rules[i].heading,
          rules[i].content,
          userId,
        ]);
      }
      const [hasServiceAndEquip] = await conn.query(
        findServiceAndEquip,
        userId,
      );
      if (hasServiceAndEquip.length !== 0) {
        console.log('Delete Service and Equip');
        await conn.query(deleteServiceAndEquip, userId);
      }
      for (let i = 0; i < service_and_equipment.length; i++) {
        await conn.query(insertServiceAndEquip, [
          service_and_equipment[i].icon,
          service_and_equipment[i].type,
          service_and_equipment[i].content,
          userId,
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
