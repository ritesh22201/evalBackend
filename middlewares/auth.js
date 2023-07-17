const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(400).send({'msg' : 'Token not found'});
    }

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if(decoded){
            console.log(decoded)
            req.body.userID = decoded.userID;
            next();
        }
        else{
            res.status(400).send({'msg' : 'Invalid token'});
        }
    })
}


module.exports = auth;