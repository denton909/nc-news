const express = require("express");
const { getTopics, getEndPoints } = require("./controller");
const app = express();

app.get('/api/topics', getTopics)
app.get('/api/', getEndPoints)
app.all(`/*`, (req, res) => {res.status(404).send({ msg: "Data Not Found"})})

module.exports = app;