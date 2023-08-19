const express = require('express');

const router = express.Router();
const controller = require('../controllers/shopOwnerController');
const pictureUpload = require('../util/pictureUpload');
const { userAuthorization } = require('../util/common');

router.post('/signup', controller.shoperSignUp);
router.post('/signin', controller.shoperSignIn);
router.put(
  '/update-password',
  userAuthorization,
  controller.updateShoperPassword,
);
router.get('/profile', userAuthorization, controller.getShoperProfile);
router.patch('/profile', userAuthorization, controller.updateShoperProfile);

router.put(
  '/basic-info',
  userAuthorization,
  pictureUpload.setting().fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'secondary_image_1', maxCount: 1 },
    { name: 'secondary_image_2', maxCount: 1 },
  ]),
  controller.basicInfoUpdate,
);
router.put('/menu', userAuthorization, controller.menuUpdate);
router.put('/seat-setting', userAuthorization, controller.setSeatType);
router.put('/status', userAuthorization, controller.statusUpdate);
router.post('/publish', userAuthorization, controller.ChangeProfilePubStatus);
router.post('/unpublish', userAuthorization, controller.ChangeProfilePubStatus);

module.exports = router;
