const { selectTopics, selectEndPoints } = require("./model")


exports.getTopics = (req, res, next) => {
    selectTopics().then((topicsArray)=> {
        res.status(200).send({topics: topicsArray})
    })
    .catch(next)
}

exports.getEndPoints = (req, res, next) => {
    const endPointsObject = selectEndPoints()
    
    res.status(200).send({endPoints: endPointsObject})
}