const express = require('express');

const router = express.Router();
const controller = require('../controllers/shopController');

router.get('/search', controller.search);
router.get('/:id/basic-info', controller.getBasicInfo);
router.get('/:id/status', controller.getCurrentStatus);
router.post('/:cafe_id/comments', controller.createComment);
router.delete('/:cafe_id/comments/:comment_id', controller.deleteComment);
router.get('/:id/comments', controller.getComments);

module.exports = router;
