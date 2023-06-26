const { selectTopics, selectArticleById } = require("./model")


exports.getTopics = (req, res, next) => {
    
    selectTopics().then((topicsArray)=> {
        
        res.status(200).send({topics: topicsArray})
    })
    .catch(next)
}














exports.getArticlesById = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById()
    res.status(200).send()
}