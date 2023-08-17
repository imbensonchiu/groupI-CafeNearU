const express = require('express');

const router = express.Router();
const controller = require('../controllers/shopController');

router.get('/search', controller.search);
router.get('/:id/basic-info', controller.getBasicInfo);
router.get('/:id/status', controller.getCurrentStatus);
router.get('/:id/comments', controller.getComments);

module.exports = router;
