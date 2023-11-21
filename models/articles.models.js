const db = require('../db/connection.js')
exports.selectArticles= (article_id) => {
    const queryString = `SELECT * FROM articles WHERE article_id=$1`
    const queryArray = [article_id]
    return db.query(queryString,queryArray)
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: 'article does not exist' })
        }
            return result.rows[0];
        })
}

