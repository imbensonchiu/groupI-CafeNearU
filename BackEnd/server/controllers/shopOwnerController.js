const model = require('../models/shopOwnerModel');

module.exports = {
  basicInfoUpdate: async (req, res) => {
    const ip = '13.211.10.154';
    const primaryImg = req.files.primary_image
      ? `https://${ip}/shopPics/${req.files.primary_image[0].filename}`
      : console.log('missing primary picture');
    const secondaryImg1 = req.files.secondary_image_1
      ? `https://${ip}/shopPics/${req.files.secondary_image_1[0].filename}`
      : null;
    const secondaryImg2 = req.files.secondary_image_2
      ? `https://${ip}/shopPics/${req.files.secondary_image_2[0].filename}`
      : null;
    const {
      name,
      type,
      introduction = null,
      opening_hour,
      closing_hour,
      address,
      telephone,
      facebook = null,
      ig = null,
      line = null,
    } = req.body;
    if (!JSON.parse(req.body.rules)) {
      return 'wrong format';
    }
    const rules = JSON.parse(req.body.rules);
    const time_limit = rules[0].heading;
    const min_order = rules[1].heading;

    const service_and_equipment = JSON.parse(req.body.service_and_equipment);
    const plug = service_and_equipment[0].content;
    const wifi = service_and_equipment[1].content;
    const smoking_area = service_and_equipment[2].content;
    const dog = service_and_equipment[3].content;
    const cat = service_and_equipment[4].content;

    if (!name || !address || !type || !opening_hour || !closing_hour) {
      console.log('missing required field222');
    }
    if (
      typeof time_limit === 'undefined' ||
      typeof min_order === 'undefined' ||
      typeof plug === 'undefined' ||
      typeof wifi === 'undefined' ||
      typeof smoking_area === 'undefined' ||
      typeof dog === 'undefined' ||
      typeof cat === 'undefined'
    ) {
      console.log('missing required field222');
    }
    const arr = [
      name,
      type,
      introduction,
      opening_hour,
      closing_hour,
      address,
      telephone,
      facebook,
      ig,
      line,
      time_limit,
      min_order,
      plug,
      wifi,
      smoking_area,
      dog,
      cat,
      primaryImg,
      secondaryImg1,
      secondaryImg2,
    ];
    await model.basicInfoUpdate(arr, rules, service_and_equipment);
    // res.json(model.basicInfoUpdate());
  },
  menuUpdate: async (req, res) => {
    const { menu } = req.body;
    if (!menu || menu.length === 0) {
      console.log('menu is required');
    }
    await model.menuUpdate(menu);
    console.log(menu);
    // res.json();
  },
  statusUpdate: (req, res) => {
    res.json(model.statusUpdate());
  },
  setSeatType: (req, res) => {
    res.json(model.setSeatType());
  },
  profilePub: (req, res) => {
    res.json(model.profilePub());
  },
  profileUnpub: (req, res) => {
    res.json(model.profileUnpub());
  },
};
