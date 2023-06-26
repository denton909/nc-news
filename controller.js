const { selectTopics } = require("./model")


exports.getTopics = (req, res, next) => {
    
    selectTopics().then((topicsArray)=> {
        
        res.status(200).send({topics: topicsArray})
    })
    .catch(next)
}