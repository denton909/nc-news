const { selectTopics,selectArticleById, selectArticles, selectComments, insertComment, updateArticle, removeComment, selectUsers } = require("./model")
const endpoints = require("./endpoints.json")


exports.getTopics = (req, res, next) => {
    selectTopics().then((topicsArray)=> {
        res.status(200).send({topics: topicsArray})
    })
    .catch(next)
}

exports.getEndPoints = (req, res, next) => {
    res.status(200).send({endPoints: endpoints})
}

exports.getArticlesById = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then((article) => {
      res.status(200).send({article: article[0]})
    })
    .catch(next)
}

exports.getArticles = (req, res, next) => {
    const { topic, sortBy, orderBy } = req.query

    selectArticles(topic, sortBy, orderBy).then((articleArray) => {
        res.status(200).send({articles: articleArray})
    }).catch(next)
}

exports.getComments = (req, res, next) => {
    
    const {article_id} = req.params
    selectComments(article_id).then((commentsArray) => {
        res.status(200).send({comments: commentsArray})
    })
    .catch(next)
}

exports.postComments = (req, res, next) => {
    const {article_id} = req.params
    const post = req.body
   insertComment(article_id, post).then((postedComment)=>{
       res.status(201).send(postedComment)
   }).catch(next)
   
}

exports.postArticleUpdate = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body
    updateArticle(article_id, inc_votes).then((updatedArticle)=>{
        res.status(201).send(updatedArticle)
    }).catch(next)
    
}


exports.deleteComments = (req, res, next) => {
    const {comment_id} = req.params
    removeComment(comment_id).then(() => {
        
        res.status(204).send()
    }).catch(next)
}


exports.getUsers = (req, res, next) => {
    selectUsers().then(({rows}) => {
        res.status(200).send({users: rows})
    }).catch(next)
}
