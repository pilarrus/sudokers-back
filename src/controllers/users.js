const createUser = (req, res) => {
    res.send({status: 'OK', message: 'user created'});
};

const deleteUser = (req, res) => {
    res.send({status: 'OK', message: 'user deleted'});
};

const getUsers = (req, res) => {
    // console.log('req.query', req.query);
    return res.json({success:true, module:'Usersss'});
};

const updateUser = (req, res) => {
    res.send({status: 'OK', message: 'user updated'});
};

module.exports = { createUser, deleteUser, getUsers, updateUser};