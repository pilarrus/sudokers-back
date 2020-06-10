const bcrypt = require('bcrypt');
const Users = require('../../mongo/models/users');
const Sudokus = require('../../mongo/models/sudokus');
const { generateKeyPairs } = require('../../utils/helpers-functions');

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 15);

    const user = await Users.create({
      username,
      password: hash,
      email,
    });

    const userId = user._id;
    const { token, refreshToken } = await generateKeyPairs(user);
    return res.status(201).json({ status: 'OK', message: { userId, token, refreshToken } });
  } catch (e) {
    if (e.code && e.code === 11000) {
      return res
        .status(400)
        .json({ status: 'DUPLICATED_VALUES', message: e.keyValue });
    }
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    await Sudokus.deleteMany({ user: req.params.id });
    return res.json({ status: 'OK', message: 'user deleted' });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
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
        .json({ status: 'ERROR', message: 'Only one parameter is allowed' });
    }
    if (req.query.username) {
      user = await Users.findOne({ username: req.query.username });
    } else if (req.query.email) {
      user = await Users.findOne({ email: req.query.email });
    } else {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'Unsupported parameter' });
    }

    if (user) {
      return res.status(200).json({ status: 'OK', message: false });
    }
    return res.status(200).json({ status: 'OK', message: true });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: 'INVALID_EMAIL_AND/OR_PASSWORD', message: '' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ status: 'INVALID_EMAIL_AND/OR_PASSWORD', message: '' });
    }

    const userId = user._id;
    const { token, refreshToken } = await generateKeyPairs(user);
    return res.json({ status: 'OK', message: { userId, token, refreshToken } });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    await Users.findByIdAndUpdate(req.params.id, {
      username,
      password,
      email
    });
    return res.json({ status: 'OK', message: 'user updated' });
  } catch (e) {
    if (e.code && e.code === 11000) {
      return res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: e.keyValue });
    }
    return res.status(500).json({ status: 'ERROR', message: 'user updated' });
  }
};

const refreshLogin = async (req, res) => {
  try {
    const { userId, refresh } = req.body;
    const user = await Users.findById(userId);
    const userRefreshToken = user.refresh_token;
    if (userRefreshToken !== refresh) {
      return res.status(401).json({ status: 'INVALID_REFRESH_TOKEN', message: '' });
    }

    const { token, refreshToken } = await generateKeyPairs(user);
    return res.json({ status: 'OK', data: { token, refreshToken } });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  // getUsers,
  isAvailable,
  login,
  updateUser,
  refreshLogin,
};
