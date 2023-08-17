const express = require('express');

const router = express.Router();
const customerController = require('../controllers/customerController');
const { userAuthorization } = require('../util/common');

router.post('/signup', customerController.customerSignUp);
router.post('/signin', customerController.customerSignIn);

router.put(
  '/update-password',
  userAuthorization,
  customerController.updateCustomerPassword,
);

router.get(
  '/profile',
  userAuthorization,
  customerController.getCustomerProfile,
);
router.put(
  '/profile',
  userAuthorization,
  customerController.updateCustomerProfile,
);
router.put(
  '/profile',
  userAuthorization,
  customerController.updateCustomerPicture,
);

module.exports = router;
