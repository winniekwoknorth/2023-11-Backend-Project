const { checkArticleIdExists } = require('../models/articles.models.js')
const { selectComments } = require('../models/comments.models.js')

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    const commentPromises = [selectComments(article_id)]
    if(article_id){commentPromises.push(checkArticleIdExists(article_id))}

Promise.all(commentPromises)
    .then((resolvedPromises) => {
        const comments = resolvedPromises[0]
        res.status(200).send({ comments })
    })
    .catch(next)
}