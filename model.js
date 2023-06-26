const db = require("./db/connection")
const endpoints = require("./endpoints.json")

exports.selectTopics = (req, res) => {
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        return rows
    })
}

