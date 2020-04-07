const bcrypt = require('bcrypt');
const Users = require('../mongo/models/users');

const createUser = async (req, res) => {
  console.log('req.body', req.body);

  try {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 15);
    // console.log('FIN', hash);
    await Users.create({
      username,
      password: hash,
      email
    });

    res.send({status: 'OK', message: 'user created'});

  } catch (e) {
    if(e.code && e.code === 11000) {
      res.status(400).send({status: 'DUPLICATED_ VALUES', message: e.keyValue});
      return;
    }
    // console.log(e);
    // res.status(500).send({status: 'ERROR', message: e.message});
  }
};

const deleteUser = (req, res) => {
  return res.send({status: 'OK', message: 'user deleted'});
};

const getUsers = (req, res) => {
  // console.log('req.query', req.query);
  return res.json({success: true, module: 'Usersss'});
};

const updateUser = (req, res) => {
  return res.send({status: 'OK', message: 'user updated'});
};

module.exports = {createUser, deleteUser, getUsers, updateUser};