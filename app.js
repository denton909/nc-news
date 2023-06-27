const { getTopics, getEndPoints, getArticlesById, getComments  } = require("./controller");
const express = require('express');
const { handleCustomErrors } = require("./error-handling");
const app = express();

app.get('/api/topics', getTopics)
app.get('/api', getEndPoints)
app.get('/api/articles/:article_id',getArticlesById)
app.get('/api/articles/:article_id/comments', getComments)
app.use(handleCustomErrors)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})

module.exports = app;