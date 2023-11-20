const express = require('express');
const app = express();
const {getTopics}= require('./controllers/topics.controllers.js')
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./err.js');

app.use(express.json());
app.get('/api/topics', getTopics)
app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app;