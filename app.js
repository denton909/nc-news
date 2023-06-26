const express = require("express");
const { getTopics, getArticlesById } = require("./controller");
const app = express();

app.get('/api/topics', getTopics)




app.get('/api/articles/:article_id',getArticlesById)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})

module.exports = app;