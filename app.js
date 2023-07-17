const express = require("express");
const { getTopics, getEndPoints, getArticles, getArticlesById, getComments, postArticleUpdate, postComments, deleteComments, getUsers} = require("./controller");
const { handleCustomErrors, handlePSQLErrors } = require("./error-handling");
const cors = require('cors')
const app = express();
app.use(cors(), express.json())

app.get('/api', getEndPoints)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id',getArticlesById)
app.get('/api/articles/:article_id/comments', getComments)
app.post('/api/articles/:article_id/comments', postComments)
app.patch('/api/articles/:article_id', postArticleUpdate)
app.delete('/api/comments/:comment_id', deleteComments)
app.get('/api/users', getUsers)
app.use(cors(), handlePSQLErrors)
app.use(cors(), handleCustomErrors)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})



module.exports = app;