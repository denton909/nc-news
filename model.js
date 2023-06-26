const db = require("./db/connection")

exports.selectTopics = (req, res) => {
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        return rows
    })
}














exports.selectArticleById = (req, res) => {
    console.log('hi')
}