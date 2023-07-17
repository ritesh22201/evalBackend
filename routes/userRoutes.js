const express = require('express');
const validator = require('../middlewares/validator');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const BlacklistModel = require('../models/blacklistModel');
const userRouter = express.Router();

userRouter.post('/register', validator, async (req, res) => {
    const { password } = req.body;
    try {
        const newPass = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ ...req.body, password: newPass });
        res.status(200).send({ 'msg': 'User registered successfully', user });
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})


userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ 'msg': 'User not found' });
        }
        else {
            const verifyUser = await bcrypt.compare(password, user.password);
            if (!verifyUser) {
                res.status(400).send({ 'msg': 'Wrong Password' });
            }
            else{
                const token = jwt.sign({userID : user._id}, process.env.secretKey, {expiresIn : '5h'});
                res.status(200).send({ 'msg': 'User logged in successfully', token });
            }
        }

    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})


userRouter.get('/logout', async(req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if(!token){
            res.status(400).send({'msg' : 'Token not found'})
        }
        else{
            const blacklistedUser = await BlacklistModel.findOne({token});
            if(blacklistedUser){
                res.status(400).send({'msg' : 'Login again'})
            }
            else{
                const logoutuser = await BlacklistModel.create({token});
                res.status(200).send({'msg' : 'User logged out successfully'});
            }
        }
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})


module.exports = userRouter;