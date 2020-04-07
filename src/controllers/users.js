const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  console.log('req.body', req.body);

  try {
    const hash = await bcrypt.hash(req.body.password, 15);
    console.log('FIN', hash);
    res.send({status: 'OK', message: 'user created'});

  } catch (e) {
    console.log(e);
    res.status(500).send({status: 'ERROR', message: e.message});
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