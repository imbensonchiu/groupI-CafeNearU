const pool = require('../util/db');

module.exports = {
  getHomepage: async () => {
    try {
      const num = 2;
      // 要把 is_published = true AND 加回去
      const query = ``;
      const [result] = await pool.query(query);
      console.log(result);
    } finally {
      pool.releaseConnection();
    }
  },
};
