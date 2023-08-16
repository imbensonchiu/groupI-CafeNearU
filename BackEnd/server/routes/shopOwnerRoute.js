const express = require('express');

const router = express.Router();
const controller = require('../controllers/shopOwnerController');

router.put('/:id/basic-info', controller.basicInfoUpdate);
router.put('/:id/menu', controller.menuUpdate);
router.put('/:id/status', controller.statusUpdate);
router.put('/:id/seat', controller.seatTypeUpdate);
router.post('/:id/publish', controller.profilePub);
router.post('/:id/unpublish', controller.profileUnpub);

module.exports = router;
