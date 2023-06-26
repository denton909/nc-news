const { selectTopics, selectEndPoints } = require("./model")
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