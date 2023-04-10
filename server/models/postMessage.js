import mongoose  from "mongoose";

// helps to give each post what we want like title , message
const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
});

var PostMessage = mongoose.model('PostMessage',postSchema);
export default PostMessage;