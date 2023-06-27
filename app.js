const express = require("express");
const { getTopics, getEndPoints, getArticles, getArticlesById, getComments } = require("./controller");
const { handleCustomErrors, handlePSQLErrors } = require("./error-handling");
const app = express();

app.get('/api', getEndPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id',getArticlesById)
app.get('/api/articles/:article_id/comments', getComments)
app.use(handlePSQLErrors)
app.use(handleCustomErrors)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})

module.exports = app;