const errorHandler = require('../util/errorHandler');
const { extractUserIDFromToken } = require('../util/common');

const WishList = require('../models/wishListModel');
const wishListModel = require('../models/wishListModel');

module.exports = {
  createWishList: async (req, res) => {
    try {
      const customer_id = extractUserIDFromToken(req);
      let { wishlist_name } = req.body;

      if (wishlist_name.trim() === '') {
        return errorHandler.clientError(res, 'missingContent', 400);
      }
      try {
        const result = await WishList.createWishList(
          customer_id,
          wishlist_name,
        );
        console.log(result);
        const responseData = {
          data: {
            wishlist: {
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
  getWishList: async (req, res) => {
    try {
      const customer_id = extractUserIDFromToken(req);
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
      const wishlist_id = parseInt(req.params.wishlist_id);
      const cafe_id = parseInt(req.params.cafe_id);

      const isCafeInWishlist = await wishListModel.isCafeInWishlist(
        wishlist_id,
        cafe_id,
      );
      if (isCafeInWishlist) {
        return errorHandler.clientError(res, 'cafeExistsInWishlist', 400);
      }
      try {
        await wishListModel.addCafeToWishList(wishlist_id, cafe_id);

        const responseData = {
          data: {
            wishlist: {
              id: wishlist_id,
            },
            cafe: {
              id: cafe_id,
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
  deleteCafeFromWishList: async (req, res) => {
    try {
      const wishlist_id = parseInt(req.params.wishlist_id);
      const cafe_id = parseInt(req.params.cafe_id);
      if (!wishlist_id || !cafe_id) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      const isCafeInWishlist = await wishListModel.isCafeInWishlist(
        wishlist_id,
        cafe_id,
      );
      if (!isCafeInWishlist) {
        return errorHandler.clientError(res, 'cafeNotExistsInWishlist', 400);
      }
      try {
        await wishListModel.deleteCafeFromWishList(wishlist_id, cafe_id);

        const responseData = {
          data: {
            wishlist: {
              id: wishlist_id,
            },
            cafe: {
              id: cafe_id,
            },
          },
        };

        res.status(200).json(responseData);
      } catch (error) {
        console.log(error);
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
