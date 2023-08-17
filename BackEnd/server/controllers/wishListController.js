const errorHandler = require('../util/errorHandler');
const { extractUserIDFromToken } = require('../util/common');

const WishList = require('../models/wishListModel');

module.exports = {
  createWishList: async (req, res) => {
    try {
      // ...
      try {
        const responseData = {
          data: {},
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  getWishList: async (req, res) => {
    try {
      // ...
      try {
        const responseData = {
          data: {},
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  addCafeToWishList: async (req, res) => {
    try {
      // ...
      try {
        const responseData = {
          data: {},
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  deleteCafeFromWishList: async (req, res) => {
    try {
      // ...
      try {
        const responseData = {
          data: {},
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  getCafeFromWishList: async (req, res) => {
    try {
      // ...
      try {
        const responseData = {
          data: {},
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
};
