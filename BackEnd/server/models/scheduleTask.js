const pool = require('../util/db');

module.exports = {
  updateCommentDashboard: async () => {
    try {
      const query = `WITH NewRatings AS (
            SELECT
                cafe_id,
                AVG(total_rating) AS new_avg_total_rating,
                AVG(cleanliness) AS new_avg_cleanliness,
                AVG(service) AS new_avg_service,
                AVG(food) AS new_avg_food,
                AVG(wifi) AS new_avg_wifi,
                AVG(atmosphere) AS new_avg_atmosphere
            FROM
                comments
            GROUP BY
                cafe_id
        ),
        QuietStats AS (
            SELECT
                cafe_id,
                SUM(is_quiet) AS quiet_count,
                COUNT(*) AS total_comments,
                SUM(is_quiet) / COUNT(*) AS quiet_percentage
            FROM
                comments
            GROUP BY
                cafe_id
        ),
        CommentsCount AS (
            SELECT
                cafe_id,
                COUNT(id) AS total_comments
            FROM
                comments
            GROUP BY
                cafe_id
        )
        UPDATE comment_dashboard AS cd
        JOIN NewRatings AS nr ON cd.cafe_id = nr.cafe_id
        JOIN QuietStats AS qs ON cd.cafe_id = qs.cafe_id
        JOIN CommentsCount AS cc ON cd.cafe_id = cc.cafe_id
        SET
            cd.average_total_rating = nr.new_avg_total_rating,
            cd.average_cleanliness = nr.new_avg_cleanliness,
            cd.average_service = nr.new_avg_service,
            cd.average_food = nr.new_avg_food,
            cd.average_wifi = nr.new_avg_wifi,
            cd.average_atmosphere = nr.new_avg_atmosphere,
            cd.is_quiet = qs.quiet_percentage,
            cd.comment_count = cc.total_comments;`;

      await pool.execute(query);
      console.log('資料更新成功');
    } catch (error) {
      console.log('資料更新失敗:', error);
    } finally {
      pool.releaseConnection();
    }
  },
};
