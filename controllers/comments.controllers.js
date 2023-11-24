const { checkArticleIdExists } = require('../models/articles.models.js')
const { selectComments, addComments } = require('../models/comments.models.js')

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    const commentPromises = [selectComments(article_id)]
    if(article_id){commentPromises.push(checkArticleIdExists(article_id))}

Promise.all(commentPromises)
    .then((resolvedPromises) => {
        const comments = resolvedPromises[0]
        res.status(200).send({comments})
    })
    .catch(next)
}

exports.postCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    const newComments = req.body
    addComments(article_id, newComments)
        .then((comments) => {
        res.status(201).send({comments})
    })
    .catch(next)
}

