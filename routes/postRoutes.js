const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const PostModel = require('../models/postModel');
const postRouter = express.Router();

postRouter.get('/', auth, async(req, res) => {
    const userID = req.body.userID;
    try {
        const users = await PostModel.find({userID});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

postRouter.post('/add', auth, async(req, res) => {
    try {
        const post = await PostModel.create(req.body);
        res.status(200).send({'msg' : 'Post added successfully', post});
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

postRouter.patch('/update/:id', auth, async(req, res) => {
    const userID = req.body.userID;
    const id = req.params.id;
    const user = await PostModel.findOne({_id : id});
    try {
        if(userID !== user.userID.toString()){
            res.status(400).send({'msg' : 'You are not authorized to perform this task'})
        }
        else{
            const updatedPost = await PostModel.findByIdAndUpdate({_id : id}, req.body, {new : true});
            res.status(200).send({'msg' : 'Post updated', updatedPost});
        }
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

postRouter.delete('/delete/:id', auth, async(req, res) => {
    const userID = req.body.userID;
    const id = req.params.id;
    const user = await PostModel.findOne({_id : id});
    try {
        if(userID !== user.userID.toString()){
            res.status(400).send({'msg' : 'You are not authorized to perform this task'})
        }
        else{
            const updatedPost = await PostModel.findByIdAndDelete({_id : id});
            res.status(200).send({'msg' : 'Post deleted'});
        }
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})


module.exports = postRouter;