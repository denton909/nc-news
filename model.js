const db = require("./db/connection")

exports.selectTopics = () => {
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        return rows
    })
}

exports.selectArticleById = (id) => {
      
    return db.query(`SELECT articles.article_id, articles.body, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id`, [id]).then(({rows})=>{
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Request Not Found"})
        }
        return rows
    })
}


exports.selectArticles = (searchByTopic = undefined, sortBy = 'created_at', orderBy = 'DESC') => {
    const sortByArray = ['article_id', 'title', 'topic', 'author', 'body', 'created_at', 'votes', 'article_img_url']
    const orderByArray = ['ASC', 'DESC']
    const queryValues = []
    let queryStr = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`
    
   if(searchByTopic === undefined){
    if(!sortByArray.includes(sortBy)) {
        sortBy = undefined
    }
    if(!orderByArray.includes(orderBy)){
        orderBy = undefined
    }
   
    queryStr += ` GROUP BY articles.article_id ORDER BY ${sortBy} ${orderBy}`    
    return db.query(queryStr, queryValues).then(({rows}) => {
       if(!rows.length){
        return Promise.reject({status: 404, msg: "Request Not Found"})
       } else {
           return rows
       }
    })
    } else if (searchByTopic){
        return db.query(`SELECT * FROM topics WHERE slug = $1`, [searchByTopic]).then(({rows})=>{
            if(rows.length > 0){
                queryValues.push(searchByTopic)
                queryStr += ` WHERE articles.topic = $1`
                queryStr += ` GROUP BY articles.article_id ORDER BY ${sortBy} ${orderBy}`
                return db.query(queryStr, queryValues).then(({rows}) => {
                      return rows
                    })
            } else {
                return Promise.reject({status: 404, msg: "Request Not Found"})
            }
        })
    } else {
        return Promise.reject({status: 404, msg: "Request Not Found"})
    }
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
    
 return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`, comment_details).then(({rows}) => {
        return rows[0]
        }) 
}
exports.updateArticle = (id, votes) => {
    
    return db.query(`SELECT votes FROM articles WHERE article_id = $1`, [id]).then(({rows}) => {
        if(!rows.length) {
            return Promise.reject({status: 404, msg: "Request Not Found"})
        }
        return rows[0].votes + Number(votes)
    })
    .then((updatedTotalOfVotes) => {
    
        return db.query(`UPDATE articles SET votes= $1 WHERE article_id = $2 RETURNING *`, [updatedTotalOfVotes, id])
    })
    .then(({rows}) => {
        return rows[0]
    })
   
}

exports.removeComment = (id) => {
  return db.query('SELECT * FROM comments WHERE comment_id = $1', [id]).then(({rows})=>{
    if(rows.length === 0){
        return Promise.reject({status: 404, msg: "Request Not Found"})
    } else {
        return db.query(`DELETE FROM comments WHERE comment_id = $1 `, [id])

    }
  })
}

exports.selectUsers = () => {
    return db.query(`SELECT * FROM users`)
}

