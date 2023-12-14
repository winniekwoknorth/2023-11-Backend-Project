const db = require('../db/connection.js')

exports.selectAllUsers = () => {
    const queryString = `SELECT * FROM users`
    return db.query(queryString)
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'article does not exist' })
        }
            return result.rows;
        })
};