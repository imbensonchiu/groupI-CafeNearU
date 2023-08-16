const model = require('../models/shopModel');

module.exports = {
  search: (req, res) => {
    res.json(model.search());
  },
  getBasicInfo: (req, res) => {
    res.json(model.getBasicInfo());
  },
  getCurrentStatus: (req, res) => {
    res.json(model.getCurrentStatus());
  },
  getComments: (req, res) => {
    res.json(model.getComments());
  },
};
