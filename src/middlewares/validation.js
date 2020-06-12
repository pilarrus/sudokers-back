const { checkSchema, validationResult } = require('express-validator');

const cellsModel = {
  in: ['body'],
  isArray: true
};

const emailModel = {
  in: ['body'],
  errorMessage: 'Email inválido',
  isEmail: true
};

const dateModel = {
  in: ['body'],
  isLength: {
    errorMessage: 'No tiene la longitud esperada',
    options: { min: 10, max: 10 }
  },
  custom: {
    errorMessage: 'No tiene el formato esperado',
    options: (value) => {
      const strongRegex = new RegExp('^[0-9]{2,}/[0-9]{2,}/[0-9]{4,}$');
      // const strongRegex = new RegExp('^(?=.*[0-9])(?=.{4,})');
      return strongRegex.test(value);
    }
  }
};

const timerModel = {
  in: ['body'],
  isLength: {
    errorMessage: 'No tiene la longitud esperada',
    options: { min: 5, max: 5 }
  },
  custom: {
    errorMessage: 'No tiene el formato esperado',
    options: (value) => {
      const strongRegex = new RegExp('^[0-9]{2,}:[0-9]{2,}');
      return strongRegex.test(value);
    }
  }
};

const levelModel = {
  in: ['body']
};

const difficultyModel = {
  in: ['body'],
  isString: true
};

const passwordModel = {
  in: ['body'],
  isLength: {
    errorMessage: 'La contraseña debe tener al menos 4 numeros',
    options: { min: 4 }
  },
  custom: {
    // errorMessage: 'La contraseña debe ser más fuerte',
    options: (value) => {
      const strongRegex = new RegExp('^(?=.*[0-9])(?=.{4,})');
      return strongRegex.test(value);
    }
  }
};

const refreshModel = {
  in: ['body'],
  isString: true,
  isLength: {
    // errorMessage: 'El refresh token debe tener 20 caracteres',
    options: [{ min: 20, max: 20 }]
  },
};

const secondsModel = {
  in: ['body'],
  isInt: {
    options: { min: 0 }
  }
};

const sudokuIdModel = {
  in: ['params'],
  isMongoId: true
};

const userIdModel = {
  in: ['body', 'params'],
  isMongoId: true
};

const usernameModel = {
  in: ['body'],
  isString: true,
};

const tokenModel = {
  in: ['headers'],
  isJWT: true
};

const createSudoku = {
  token: tokenModel,
  cells: cellsModel,
  difficulty: difficultyModel,
  'cells.*.position': {
    in: ['body'],
    notEmpty: true,
  },
  'cells.*.position.row': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  },
  'cells.*.position.column': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  },
  'cells.*.writable': {
    in: ['body'],
    isBoolean: true
  },
  'cells.*.number': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  },
  'cells.*.grid': {
    in: ['body'],
    isArray: true
  },
  'cells.*.grid.*': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  }
};

const deleteSudoku = {
  sudokuId: sudokuIdModel,
  token: tokenModel
};

const deleteUser = {
  id: userIdModel,
  token: tokenModel
};

const getSudoku = {
  sudokuId: sudokuIdModel
};

const getSudokusByUser = {
  userId: userIdModel,
  token: tokenModel
};

const initialiseRanking = {
  userId: userIdModel
};

const login = {
  email: emailModel,
  password: passwordModel
};

const refreshLogin = {
  userId: userIdModel,
  refresh: refreshModel
};

const register = {
  username: usernameModel,
  password: passwordModel,
  email: emailModel
};

const updateRanking = {
  userId: userIdModel,
  user: userIdModel,
  level: levelModel,
  date: dateModel,
  timer: timerModel
};

const updateSeconds = {
  sudokuId: sudokuIdModel,
  token: tokenModel,
  seconds_accumulated: secondsModel
};

const updateSudoku = {
  sudokuId: sudokuIdModel,
  token: tokenModel,
  cells: cellsModel,
  'cells.*.position': {
    in: ['body'],
    notEmpty: true,
  },
  'cells.*.position.row': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  },
  'cells.*.position.column': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  },
  'cells.*.writable': {
    in: ['body'],
    isBoolean: true
  },
  'cells.*.number': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  },
  'cells.*.grid': {
    in: ['body'],
    isArray: true
  },
  'cells.*.grid.*': {
    in: ['body'],
    isInt: {
      options: { min: 0, max: 9 }
    }
  }
};

const updateUser = {
  id: userIdModel,
  token: tokenModel,
  username: usernameModel,
  password: passwordModel,
  email: emailModel
};

const reqValidation = model => (
  async (req, res, next) => {
    try {
      const middlewares = checkSchema(model);
      // console.log('middlewares: ', middlewares);
      await Promise.all(middlewares.map(middleware => middleware.run(req)));

      validationResult(req).throw();
      return next();
    } catch (e) {
      const data = e.errors.map(item => ({ msg: item.msg, param: item.param }));
      return res.status(400).json({ status: 'ERROR', errors: data });
    }
  }
);

module.exports = {
  createSudoku,
  deleteSudoku,
  deleteUser,
  getSudoku,
  getSudokusByUser,
  initialiseRanking,
  login,
  refreshLogin,
  register,
  updateRanking,
  updateSeconds,
  updateSudoku,
  updateUser,
  reqValidation
};
