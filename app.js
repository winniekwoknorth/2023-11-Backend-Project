const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controllers.js')
const { getApi } = require('./controllers/api.controllers.js')
const {getArticlesById, getArticles}= require('./controllers/articles.controllers.js')
const {patchArticlesById}= require('./controllers/articles.controllers.js')
const { getCommentsByArticleId, postCommentsByArticleId, deleteCommentByCommentId} = require('./controllers/comments.controllers.js')
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./err.js');
const { getUsers } = require('./controllers/users.controllers.js')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.get('/api/topics', getTopics)
app.get('/api/', getApi)
app.get('/api/articles/:article_id', getArticlesById)
app.get('/api/articles/', getArticles)
app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.post('/api/articles/:article_id/comments', postCommentsByArticleId)
app.delete('/api/comments/:comment_id', deleteCommentByCommentId)
app.patch('/api/articles/:article_id', patchArticlesById)
app.get('/api/users', getUsers)
app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;
