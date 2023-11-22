const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics.controllers.js')
const { getApi } = require('./controllers/api.controllers.js')
const {getArticlesById, getArticles}= require('./controllers/articles.controllers.js')
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./err.js');

app.get('/api/topics', getTopics)
app.get('/api/', getApi)
app.get('/api/articles/:article_id', getArticlesById)
app.get('/api/articles/', getArticles)
app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;