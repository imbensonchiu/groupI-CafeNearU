const errorHandler = require('../util/errorHandler');
const {
  bcrypt,
  jwt,
  jwtSecret,
  validateEmail,
  validateProvider,
} = require('../util/common');
const model = require('../models/shopOwnerModel');

module.exports = {
  shoperSignUp: async (req, res) => {
    try {
      const data = req.body;

      if (Object.keys(data).length !== 3) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }

      let { name, email, password } = data;

      name = name.trim();
      email = email.trim();
      password = password.trim();

      if (!name || !email || !password) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      if (!validateEmail(email)) {
        return errorHandler.clientError(res, 'emailValidate', 400);
      }
      try {
        const existingUser = await model.getByEmail(email);

        if (existingUser) {
          errorHandler.clientError(res, 'emailExist', 403);
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);

          const [result] = await model.insertNewShoper(
            name,
            email,
            hashedPassword,
          );
          const userID = result.insertId;

          const user = await model.getByID(userID);

          const payload = {
            id: user.id,
            provider: user.provider,
            name: user.name,
            email: user.email,
          };
          const accessToken = jwt.sign(payload, jwtSecret);

          const responseData = {
            data: {
              access_token: accessToken,
              user: payload,
            },
          };
          res.status(200).json(responseData);
        }
      } catch (error) {
        console.log(error);
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  shoperSignIn: async (req, res) => {
    try {
      const data = req.body;

      if (Object.keys(data).length !== 3) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      let { provider, email, password } = data;

      provider = provider.trim();
      email = email.trim();
      password = password.trim();

      // Validate user input
      if (!provider || !email || !password) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      try {
        // Validate if user exist in our database
        const user = await model.getByEmail(email);
        if (
          user &&
          validateProvider(user.provider) &&
          (await bcrypt.compare(password, user.password))
        ) {
          // Generate JWT
          const payload = {
            id: user.id,
            provider: user.provider,
            name: user.name,
            email: user.email,
          };
          const accessToken = jwt.sign(payload, jwtSecret);

          const responseData = {
            data: {
              access_token: accessToken,
              user: payload,
            },
          };
          res.status(200).json(responseData);
        } else {
          errorHandler.clientError(res, 'signInFailed', 403);
        }
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
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
    res.json(model.menuUpdate());
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
