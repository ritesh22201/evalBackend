const UserModel = require("../models/userModel");

const validator = async(req, res, next) => {
    
    const {email} = req.body;

    const existedUser = await UserModel.findOne({email});
    if(existedUser){
        res.status(400).send({'msg' : 'User already registered'})
    }
    else{
        next();
    }
}

module.exports = validator;