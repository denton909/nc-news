const { selectTopics,selectArticleById } = require("./model")
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
      
      try{
        if(article.length > 0){
            res.status(200).send({article: article[0]})
        } else {
            throw new Error
        }
      } catch (error){
        res.status(413).send({msg: "Request Entity Is Larger Than Data Range"})
      }

    })
    .catch(next)
}