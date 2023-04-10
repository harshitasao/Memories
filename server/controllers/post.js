import PostMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// try catch incase any error occurs in try finding the post whuch are available which is a asynchronous function
export const getPosts = async (req,res) => {
    try {
        const postmessages = await PostMessage.find();


        res.status(200).json(postmessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res) => {
    // creation of post
    const {title,message,selectedFile,creator ,tags} = req.body;

    const newPost = new PostMessage({title,message,selectedFile,creator ,tags});
    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req,res) => {
    const {id } = req.params;
    const {title,message,selectedFile,creator ,tags} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
  const updatedPost = {title,message,selectedFile,creator ,tags , _id:id};
  await PostMessage.findByIdAndUpdate(id ,updatedPost, {new:true});
  res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await PostMessage.findByIdAndRemove(id);
    console.log('DELETE');
    res.json({message:'Post deleted successfully'});
}

export const likePost = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount :post.likeCount + 1} , {new:true});

    res.json(updatedPost);
}
export default router;