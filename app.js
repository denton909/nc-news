const express = require("express");
const { getTopics, getEndPoints, getArticles } = require("./controller");
const app = express();

app.get('/api', getEndPoints)
app.get('/api/topics', getTopics)







app.get('/api/articles', getArticles)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})

module.exports = app;