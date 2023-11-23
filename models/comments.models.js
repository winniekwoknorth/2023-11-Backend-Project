const db = require('../db/connection.js')
exports.selectComments= (article_id) => {
    const queryString = `SELECT * FROM comments WHERE article_id=$1 
    ORDER BY created_at DESC`
    const queryArray = [article_id]
    return db.query(queryString,queryArray)
        .then((result) => {
            return result.rows;
        })
}