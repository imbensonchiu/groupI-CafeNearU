const errorHandler = require('../util/errorHandler');
const {
  bcrypt,
  jwt,
  jwtSecret,
  extractUserIDFromToken,
  validateEmail,
  validateProvider,
  hasJsonStructure,
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
    try {
      const header = req.get('Content-Type');
      console.log(header);
      if (!header.includes('multipart/form-data')) {
        return errorHandler.clientError(res, 'contentTypeValidate', 400);
      }
      const userId = extractUserIDFromToken(req);
      const ip = '13.211.10.154';

      if (typeof req.files.primary_image === 'undefined') {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }

      const primaryImg = `https://${ip}/shopPics/${req.files.primary_image[0].filename}`;

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
      if (!hasJsonStructure(req.body.rules)) {
        return errorHandler.clientError(res, 'jsonValidate', 400);
      }
      const rules = JSON.parse(req.body.rules);
      const time_limit = rules[0].heading;
      const min_order = rules[1].heading;
      if (!hasJsonStructure(req.body.service_and_equipment)) {
        return errorHandler.clientError(res, 'jsonValidate', 400);
      }
      const service_and_equipment = JSON.parse(req.body.service_and_equipment);
      const plug = service_and_equipment[0].content;
      const wifi = service_and_equipment[1].content;
      const smoking_area = service_and_equipment[2].content;
      const dog = service_and_equipment[3].content;
      const cat = service_and_equipment[4].content;

      if (!name || !address || !type || !opening_hour || !closing_hour) {
        return errorHandler.clientError(res, 'inputFeild', 400);
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
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      const basicInfo = [
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
      const user = await model.getByID(userId);
      if (!user) {
        return errorHandler.clientError(res, 'emailExist', 403);
      }
      await model.basicInfoUpdate(
        userId,
        basicInfo,
        rules,
        service_and_equipment,
      );
      res.status(200).json({
        data: {
          shops: {
            id: userId,
          },
        },
      });
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  menuUpdate: async (req, res) => {
    try {
      const header = req.get('Content-Type');
      if (header !== 'application/json') {
        return errorHandler.clientError(res, 'contentTypeValidate', 400);
      }
      const userId = extractUserIDFromToken(req);
      const { menu } = req.body;
      if (!menu || menu.length === 0) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      await model.menuUpdate(userId, menu);
      res.status(200).json({
        data: {
          shops: {
            id: userId,
          },
        },
      });
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  setSeatType: async (req, res) => {
    try {
      const header = req.get('Content-Type');
      if (header !== 'application/json') {
        return errorHandler.clientError(res, 'contentTypeValidate', 400);
      }
      const userId = extractUserIDFromToken(req);
      const { seats } = req.body;
      if (!seats || seats.length === 0) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      await model.setSeatType(userId, seats);
      res.status(200).json({
        data: {
          shops: {
            id: userId,
          },
        },
      });
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  statusUpdate: async (req, res) => {
    try {
      const header = req.get('Content-Type');
      if (header !== 'application/json') {
        return errorHandler.clientError(res, 'contentTypeValidate', 400);
      }
      const userId = extractUserIDFromToken(req);
      const { operating_status, type, available_seats } = req.body;
      if (
        !operating_status ||
        !type ||
        !('available_seats' in req.body) ||
        !operating_status.trim() ||
        !type.trim()
      ) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      const result = await model.checkSeatSetting(userId, type);
      if (result === 'Seat Not Found') {
        return errorHandler.clientError(res, 'seatNotFound', 400);
      }
      await model.statusUpdate(userId, operating_status, type, available_seats);
      res.status(200).json({
        data: {
          shops: {
            id: userId,
          },
        },
      });
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  profilePub: (req, res) => {
    res.json(model.profilePub());
  },
  profileUnpub: (req, res) => {
    res.json(model.profileUnpub());
  },
};
