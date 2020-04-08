const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../mongo/models/users');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(401).send({status: 'USER_NOT_FOUND', message: ''});

    const isOk = await bcrypt.compare(password, user.password);
    if(!isOk)
      return res.status(401).send({status: 'INVALID_PASSWORD', message: ''});

    const expiresIn = 60*10;
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn});
    res.send({status: 'OK', data: {token, expiresIn}});

  } catch (e) {
    res.status(500).send({status: 'ERROR', message: e.message});
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 15);

    await Users.create({
      username,
      password: hash,
      email
    });

    res.send({status: 'OK', message: 'user created'});

  } catch (e) {
    if(e.code && e.code === 11000)
      return res.status(400).send({status: 'DUPLICATED_VALUES', message: e.keyValue});

    res.status(500).send({status: 'ERROR', message: e.message});
  }
};

const deleteUser = (req, res) => {
  res.send({status: 'OK', message: 'user deleted'});
};

const getUsers = (req, res) => {
  res.json({success: true, module: 'Users'});
};

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
      username,
      email
    });
    return res.send({status: 'OK', message: 'user updated'});

  } catch (e) {
    if(e.code && e.code === 11000)
      return res.status(400).send({status: 'DUPLICATED_VALUES', message: e.keyValue});

    res.status(500).send({status: 'ERROR', message: 'user updated'});
  }
};

module.exports = {createUser, deleteUser, getUsers, updateUser, login};