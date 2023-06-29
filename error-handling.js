    exports.handlePSQLErrors = (err, req, res, next) => {
        console.log(err)
    if(err.code === '22P02'){
        res.status(400).send({msg: "Bad Request Invalid Input"})
    } else {
        next(err)
    }
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } 

}
