const bcrypt = require('bcrypt');
const Users = require('../mongo/models/users');

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
    if(e.code && e.code === 11000) {
      res.status(400).send({status: 'DUPLICATED_VALUES', message: e.keyValue});
      return;
    }

    res.status(500).send({status: 'ERROR', message: e.message});
  }
};

const deleteUser = (req, res) => {
  return res.send({status: 'OK', message: 'user deleted'});
};

const getUsers = (req, res) => {
  return res.json({success: true, module: 'Usersss'});
};

const updateUser = async (req, res) => {
  try {
    const { username, email, userId } = req.body;
    await Users.findByIdAndUpdate(userId, {
      username,
      email
    });
    return res.send({status: 'OK', message: 'user updated'});

  } catch (e) {
    if(e.code && e.code === 11000) {
      res.status(400).send({status: 'DUPLICATED_VALUES', message: e.keyValue});
      return;
    }
    res.status(500).send({status: 'ERROR', message: 'user updated'});
  }
};

module.exports = {createUser, deleteUser, getUsers, updateUser};