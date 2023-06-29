const { selectTopics,selectArticleById, selectArticles, selectComments, insertComment, removeComment } = require("./model")
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
    selectArticles().then((articleArray) => {
        res.status(200).send({articles: articleArray})
    })
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









exports.deleteComments = (req, res, next) => {
    const {comment_id} = req.params
    removeComment(comment_id).then(() => {
        res.status(204).send()
    })
}








