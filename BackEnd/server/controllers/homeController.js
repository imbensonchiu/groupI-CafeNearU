const model = require('../models/homeModel');

module.exports = {
  getHomepage: async (req, res) => {
    await model.getHomepage();
  },
};
