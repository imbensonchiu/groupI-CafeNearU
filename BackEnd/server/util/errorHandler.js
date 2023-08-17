const errorMessages = {
  client: {
    // 400 Client Error
    // user
    inputFeild: 'Missing input feild',
    lostParams: 'Lost params',
    emailValidate: 'Invalid email format',
    passwordValidate: 'Invalid password format',
    userNotFound: 'User not found',
    wrongPassword: 'Sign In Failed (wrong password)',
    wrongProvider: 'Sign In Failed (wrong provider)',
    wrongToken: 'Wrong token',
    jsonValidate: 'Invalid Input Format (should be JSON)',

    // 401 Client Error (Token error)
    noToken: 'No token provided',

    // 403 Client Error (DB error)
    emailExist: 'Email already exists',
    invalidToken: 'Invalid token',
    signInFailed:
      'Sign In Failed (Wrong Password, User Not Found, Wrong provider)',
    duplicatePassword: 'Can not use the same password',
  },
  server: {
    // 500 Server Error
    internalServer: 'Internal server error',
    dbConnection: 'Connecting to db failed',
    sqlquery: 'MySQL query failed',
  },
};

module.exports = {
  clientError: (res, errorKey, statusCode = 400) => {
    const errorMessage = errorMessages.client[errorKey];
    res.status(statusCode).json({ error: errorMessage });
  },
  serverError: (res, error, errorKey) => {
    const errorMessage = errorMessages.server[errorKey];
    if (errorKey === 'internalServer') {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    } else if (errorKey === 'sqlquery') {
      console.error('MySQL error message:', error.sqlMessage);
      console.error('MySQL query:', error.sql);
    }
    res.status(500).json({ error: errorMessage });
  },
};
