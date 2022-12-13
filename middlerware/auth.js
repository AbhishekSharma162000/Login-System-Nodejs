const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) =>{

    const token = req.body.token || req.query.token || req.headers['authorization'];

    if(!token){
        res.status(200).send({success: false, mssg: "A token is required for authentication."});
    }

    try {
       const decode =  jwt.verify(token, process.env.JWT_SECRET);
       req.user = decode;
    } catch (error) {
        res.status(400).send("Invalid Token !")
    }

    return next();
}

module.exports = verifyToken;