import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/post.js';
import dotenv from 'dotenv';

// do in every express application
const app = express();
dotenv.config();

// for sending images which will be of large size 
// for requesting
app.use(bodyParser.json({limit:'30mb' , extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb' , extended:true}));
app.use(cors());

app.use('/posts' , postRoutes);
app.get('/',(req,res) => {
    res.send('Hello to Memories API');
});
// connecting application to the real database
// here using cloud atlas i.e they will host our database on our cloud

// const CONNECTION_URL = 'mongodb+srv://mernapp:mernapp123@cluster0.ik0rl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// use mongoose to connect to the database
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify' , false);