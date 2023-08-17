const express = require('express');

const router = express.Router();
const controller = require('../controllers/shopOwnerController');
const pictureUpload = require('../util/pictureUpload');
const { userAuthorization } = require('../util/common');


router.post('/signup', controller.shoperSignUp);
router.post('/signin', controller.shoperSignIn);

router.put(
  '/:id/basic-info',userAuthorization,
  pictureUpload.setting().fields([
    { name: 'primary_image', maxCount: 1 },
    { name: 'secondary_image_1', maxCount: 1 },
    { name: 'secondary_image_2', maxCount: 1 },
  ]),
  controller.basicInfoUpdate,
);
router.put('/:id/menu', controller.menuUpdate);
router.put('/:id/status', controller.statusUpdate);
router.put('/:id/seat', controller.setSeatType);
router.post('/:id/publish', controller.profilePub);
router.post('/:id/unpublish', controller.profileUnpub);

module.exports = router;
