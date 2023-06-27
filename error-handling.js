exports.handleCustomErrors = (err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: "Bad Request Invalid Input"})
    } else {
       res.status(404).send({msg: "Request Not Found"})
    }
};