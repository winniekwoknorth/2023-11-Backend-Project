const { selectAllUsers } = require('../models/users.models.js') 

exports.getUsers = (req, res, next) => {
   
    selectAllUsers().then((users) => {
     res.status(200).send({ users });
    })
       .catch(next);
};