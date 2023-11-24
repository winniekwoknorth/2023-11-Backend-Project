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

exports.selectAllArticles= (sort_by,order) => {
    let queryString = `SELECT articles.*, 
    COUNT(comment_id) AS 
    comment_count 
    FROM articles LEFT JOIN comments on articles.article_id=comments.article_id 
    GROUP BY articles.article_id `
    const validSort_By = ["article_id","author", "topic"]
    if (sort_by && ! validSort_By.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'Bad request' });
    }
    const validOrder= ['asc','desc']
    if (order && !validOrder.includes(order)) {
        return Promise.reject({ status: 400, msg: 'Bad request' });
    }
    else if (sort_by &&order) {
        queryString += `ORDER BY ${sort_by} ${order}`}
       
    else if (sort_by) {
        queryString += `ORDER BY ${sort_by} DESC`
    }
    else if (order) {
        queryString += `ORDER BY created_at ${order}`
       }
    
    else { queryString +=`ORDER BY created_at DESC`
}  
    return db.query(queryString)
    .then((result) => {
            return result.rows;
        })
}
exports.checkArticleIdExists = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({status:404, msg:"article not exist"})
            }
            return {rows}
    })
}
// exports.updateArticles = (article_id, update) => {
//     const {inc_votes} = update
//     return db.query(`UPDATE articles
//     SET votes= $1
//     WHERE article_id=$2
//     RETURNING *`,[inc_votes, article_id])
//         .then((result) => {
//             console.log(result.rows[0])
//         return result.row[0]
//     })
//  }