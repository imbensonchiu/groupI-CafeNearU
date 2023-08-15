const errorHandler = require('../util/errorHandler');
const {
  bcrypt,
  jwt,
  jwtSecret,
  validateEmail,
  validateProvider,
} = require('../util/common');

const User = require('../models/userModel');

module.exports = {
  signUp: async (req, res) => {
    try {
      const data = req.body;

      if (Object.keys(data).length !== 4) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }

      let { name, email, password, identity } = data;

      name = name.trim();
      email = email.trim();
      password = password.trim();
      identity = identity.trim();

      // Check white space
      if (!name || !email || !password || !identity) {
        return errorHandler.clientError(res, 'inputFeild', 400);
      }
      if (!validateEmail(email)) {
        return errorHandler.clientError(res, 'emailValidate', 400);
      }
      try {
        // Check duplicate email
        const existingUser = await User.getUserByEmail(email);
        if (existingUser) {
          errorHandler.clientError(res, 'emailExist', 403);
        } else {
          // Hash user's password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Get user's id from newly inserted data
          const [result] = await User.insertNewUser(
            name,
            email,
            hashedPassword,
            identity,
          );
          const userID = result.insertId;

          // Get user's data by id
          const user = await User.getUserById(userID);

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
        }
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  signIn: async (req, res) => {
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
        const user = await User.getUserByEmail(email);

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
};
