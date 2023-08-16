const model = require('../models/homeModel');

module.exports = {
  getHomepage: (req, res) => {
    res.json(model.getHomepage());
  },
};
