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

exports.addComments = (article_id, newComments) => {
    const { username, body } = newComments
    return db.query(`INSERT INTO comments(
        author, 
        body, 
        article_id)
    VALUES ($1,$2,$3)
    RETURNING *; `, [username, body, article_id])
        .then((result) => {
            return result.rows[0]
        })

}
exports.deleteComments = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id= $1
    RETURNING *; `, [comment_id])
        .then((result) => {
            return result.rows[0]
        })

}