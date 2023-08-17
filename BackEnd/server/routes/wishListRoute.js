const express = require('express');

const router = express.Router();
const wishListController = require('../controllers/wishListController');
const { userAuthorization } = require('../util/common');

router.post('/', userAuthorization, wishListController.createWishList);
router.get('/', userAuthorization, wishListController.getWishList);
router.post(
  '/:wishlist_id/addCafe/:cafe_id',
  userAuthorization,
  wishListController.addCafeToWishList,
);
router.delete(
  '/:wishlist_id/deleteCafe/:cafe_id',
  userAuthorization,
  wishListController.deleteCafeFromWishList,
);
router.get(
  '/:wishlist_id',
  userAuthorization,
  wishListController.getCafeFromWishList,
);

module.exports = router;
