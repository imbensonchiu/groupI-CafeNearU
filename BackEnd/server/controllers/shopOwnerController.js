const model = require('../models/shopOwnerModel');

module.exports = {
  basicInfoUpdate: (req, res) => {
    res.json(model.basicInfoUpdate());
  },
  menuUpdate: (req, res) => {
    res.json(model.menuUpdate());
  },
  statusUpdate: (req, res) => {
    res.json(model.statusUpdate());
  },
  seatTypeUpdate: (req, res) => {
    res.json(model.seatTypeUpdate());
  },
  profilePub: (req, res) => {
    res.json(model.profilePub());
  },
  profileUnpub: (req, res) => {
    res.json(model.profileUnpub());
  },
};
