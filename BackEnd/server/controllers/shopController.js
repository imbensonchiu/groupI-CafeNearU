const errorHandler = require('../util/errorHandler');
const {
  bcrypt,
  jwt,
  jwtSecret,
  extractUserIDFromToken,
  validateEmail,
  validateProvider,
} = require('../util/common');

const model = require('../models/shopModel');

module.exports = {
  search: async (req, res) => {
    const {
      keyword = null,
      type,
      plug,
      wifi,
      smoking_area,
      cat,
      dog,
      min_order,
      time_limit,
    } = req.query;
    const result = await model.search(
      keyword,
      type,
      plug,
      wifi,
      smoking_area,
      cat,
      dog,
      min_order,
      time_limit,
    );
    let shopObj = [];
    for (let i = 0; i < result.length; i++) {
      const obj = {
        id: result[i].id,
        name: result[i].shop_name,
        primary_image: result[i].primary_image,
        address: result[i].address,
        operating_status: result[i].operating_status,
        seats: JSON.parse(`[${result[i].seat_info}]`),
      };
      shopObj.push({ ...obj });
    }
    res.status(200).json({ data: { shops: shopObj } });
  },
  getBasicInfo: async (req, res) => {
    const cafeId = req.params.id * 1;
    const result = await model.getBasicInfo(cafeId);
    const shopObj = {
      id: result[0].id,
      name: result[0].shop_name,
      type: result[0].type,
      introduction: result[0].introduction,
      opening_hour: result[0].opening_hour,
      closing_hour: result[0].closing_hour,
      primary_image: result[0].primary_image,
      secondary_image_1: result[0].secondary_image_1,
      secondary_image_2: result[0].secondary_image_2,
      address: result[0].address,
      telephone: result[0].telephone,
      facebook: result[0].facebook,
      ig: result[0].ig,
      line: result[0].line,
      rules: result[0].rules,
      service_and_equipment: result[0].service_and_equipment,
    };
    const menuObj = {
      menu: {
        last_updated: result[0].menu_last_updated,
        categories: [],
        items: [],
      },
    };
    for (let i = 0; i < result.length; i++) {
      menuObj.menu.categories.push(result[i].category);
    }
    for (let i = 0; i < result.length; i++) {
      const itemArr = result[i].menu_items.split(',');
      const itemObj = itemArr.map((el) => {
        const [name, price] = el.split('$');
        return {
          name,
          price,
        };
      });
      menuObj.menu.items.push(itemObj);
    }
    res.status(200).json({ data: { shop: { ...shopObj, ...menuObj } } });
  },
  getCurrentStatus: async (req, res) => {
    const cafeId = req.params.id * 1;
    const result = await model.getCurrentStatus(cafeId);
    const statusObj = {
      last_update: result[0].status_last_updated,
      operating_status: result[0].operating_status,
      seats: [],
    };
    for (let i = 0; i < result.length; i++) {
      const obj = {
        icon: result[0].icon,
        type: result[0].type,
        available_seats: result[0].available_seats,
        total_seats: result[0].total_seats,
      };
      statusObj.seats.push(obj);
    }
    res.status(200).json({ data: { shop: { ...statusObj } } });
  },
  createComment: async (req, res) => {
    try {
      const customer_id = extractUserIDFromToken(req);
      const cafe_id = parseInt(req.params.cafe_id);
      const data = req.body;

      const {
        context,
        is_quiet,
        average_total_rating,
        average_cleanliness,
        average_service,
        average_food,
        average_wifi,
        average_atmosphere,
      } = data;

      if (!context || context.trim() == '') {
        return errorHandler.clientError(res, 'missingContext', 400);
      }

      try {
        const result = await model.createComment(
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
        );

        const responseData = {
          data: {
            cafe: {
              id: cafe_id,
            },
            comment: {
              id: result[0].insertId,
            },
          },
        };

        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment_id = parseInt(req.params.comment_id);
      const commentExist = await model.checkCommentExist(comment_id);
      if (!commentExist) {
        return errorHandler.clientError(res, 'commentNotExist', 400);
      }
      try {
        await model.deleteComment(comment_id);

        const responseData = {
          data: {
            comment: {
              id: comment_id,
            },
          },
        };

        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  getComments: (req, res) => {
    res.json(model.getComments());
  },
};
