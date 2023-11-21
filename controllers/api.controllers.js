const {selectApi} = require('../models/api.models.js');

exports.getApi = (req, res, next) => {
    selectApi().then((content) => {
     res.status(200).send({ content });
    })
       .catch(next);
};


    