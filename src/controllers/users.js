const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../mongo/models/users');
const Sudokus = require('../mongo/models/sudokus');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).send({ status: 'USER_NOT_FOUND', message: '' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ status: 'INVALID_PASSWORD', message: '' });
    }

    const expiresIn = 60 * 10;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn,
    });
    return res.send({ status: 'OK', data: { token, expiresIn } });
  } catch (e) {
    return res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 15);

    await Users.create({
      username,
      password: hash,
      email,
    });

    return res.send({ status: 'OK', message: 'user created' });
  } catch (e) {
    if (e.code && e.code === 11000) {
      return res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: e.keyValue });
    }
    return res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    await Sudokus.deleteMany({ user: req.params.id });
    return res.send({ status: 'OK', message: 'user deleted' });
  } catch (e) {
    return res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

// const getUsers = (req, res) => {
//   res.json({success: true, module: 'Users'});
// };

const isAvailable = async (req, res) => {
  try {
    let user;

    if (req.query.username && req.query.email) {
      return res
        .status(400)
        .send({ status: 'ERROR', message: 'Only one parameter is allowed' });
    }
    if (req.query.username) {
      user = await Users.findOne({ username: req.query.username });
    } else if (req.query.email) {
      user = await Users.findOne({ email: req.query.email });
    } else {
      return res
        .status(400)
        .send({ status: 'ERROR', message: 'Unsupported parameter' });
    }

    if (user) {
      return res.status(200).send({ status: 'OK', message: false });
    }
    return res.status(200).send({ status: 'OK', message: true });
  } catch (e) {
    return res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    await Users.findByIdAndUpdate(req.params.id, {
      username,
      email,
    });
    return res.send({ status: 'OK', message: 'user updated' });
  } catch (e) {
    if (e.code && e.code === 11000) {
      return res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: e.keyValue });
    }
    return res.status(500).send({ status: 'ERROR', message: 'user updated' });
  }
};

module.exports = {
  createUser,
  deleteUser,
  // getUsers,
  isAvailable,
  login,
  updateUser,
};
