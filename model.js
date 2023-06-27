const db = require("./db/connection")


exports.selectTopics = (req, res) => {
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        return rows
    })
}

exports.selectArticleById = (id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id]).then(({rows})=>{
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Request Not Found"})
        }
        return rows
    })
}


exports.selectArticles = (req, res) => {

}
