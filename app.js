const { getTopics, getEndPoints, getArticlesById  } = require("./controller");
const express = require('express');
const { invalidEndPoint } = require("./error-handling");
const app = express();

app.get('/api/topics', getTopics)
app.get('/api', getEndPoints)
app.get('/api/articles/:article_id',getArticlesById)
app.use(invalidEndPoint)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})

module.exports = app;