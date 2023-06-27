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
    return db.query('SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC').then(({rows}) => {
        return rows
    })
}

exports.selectComments = (id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [id]).then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "ID Not Found"})
        }
        return rows
    })
    
}


