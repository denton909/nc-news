const db = require("./db/connection")

exports.selectTopics = (req, res) => {
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        return rows
    })
}

exports.selectArticleById = (id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = ${id}`).then(({rows})=>{
        return rows
    })
}
