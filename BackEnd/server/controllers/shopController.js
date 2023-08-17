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
  search: (req, res) => {
    res.json(model.search());
  },
  getBasicInfo: (req, res) => {
    res.json(model.getBasicInfo());
  },
  getCurrentStatus: (req, res) => {
    res.json(model.getCurrentStatus());
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
