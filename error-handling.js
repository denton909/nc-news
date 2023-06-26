exports.invalidEndPoint = (err, req, res, next) => {
    res.status(400).send({msg: "Bad Request Invalid Input"})
};