const { selectTopics,selectArticleById, selectArticles } = require("./model")
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









