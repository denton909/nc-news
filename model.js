const db = require("./db/connection")
const users = require("./db/data/test-data/users")




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

exports.insertComment = (id, post) => {
    const comment_details = [
        post.username,
        post.body,
        article_id = id
    ]
    return db.query(`SELECT * FROM articles WHERE article_id = $1 `, [id]).then(({rows})=>{
        if(!rows.length) {
                return Promise.reject({status: 404, msg: "ID Not Found"})
            } else {
               
                return db.query(`SELECT * FROM users WHERE username = $1`, [post.username]).then(({rows})=>{
                    if (typeof post.username !== 'string'){
                        return Promise.reject({status: 400, msg: "Bad Request Invalid Username Type"})
                    } else if(!rows.length){
                        return Promise.reject({status: 404, msg: "User Not Found"})
                    }
                    else {
                        return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`, comment_details).then(({rows}) => {
                            return rows[0]
                        }) 
                    }
                })
                
            }
            
        })
        
}

