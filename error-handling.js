    exports.handlePSQLErrors = (err, req, res, next) => {
        
        if(err.code === '22P02'){
        res.status(400).send({msg: "Bad Request Invalid Input"})
    } else if (err.code === '23503'){
        res.status(404).send({msg: "violates foreign key constraint"})
    } else if (err.code === '23502') {
        res.status(400).send({msg: "Bad Request missing input"})
    }
    else {
        next(err)
    }
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else{
        next(err)
    } 

}




