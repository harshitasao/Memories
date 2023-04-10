// this is for the cards 
import express from "express";
import { getPosts ,createPost,updatePost,deletePost,likePost} from "../controllers/post.js";

const router = express.Router();

// this is when the user go to the localhost:5000/ ,no
// it will go licalhost:5000/posts
router.get('/' , getPosts);
router.post('/' , createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost' , likePost);

export default router;

// so simplify our work and remove complexity we are creating a new folder called controller inside of 
// it will have post.js having all the functions that we want in our routes to have