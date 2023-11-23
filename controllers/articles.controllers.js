const {selectArticles, selectAllArticles} = require('../models/articles.models.js');
const {selectComments} = require('../models/comments.models.js')
exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    selectArticles(article_id).then((article) => {
     res.status(200).send({ article });
    })
       .catch(next);
};

exports.getArticles = (req, res, next) => {
    const { sort_by, order } = req.query
    selectAllArticles(sort_by,order).then((articles) => {
     res.status(200).send({ articles });
    })
       .catch(next);
};

// exports.getCommentsByArticleId = (req, res, next) => {
//     const { article_id } = req.params
//     selectComments(article_id).then((comments) => {
//      res.status(200).send({ comments });
//     })
//        .catch(next);
// }