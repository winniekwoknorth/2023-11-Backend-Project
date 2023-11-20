const db = require('../db/connection.js')
exports.selectTopics= () => {
    let queryString = `SELECT * FROM topics`
    return db.query(queryString)
        .then((result) => {
            return result.rows;
        })
}