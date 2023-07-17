const express = require('express');
const connection = require('./db');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('Hello from Homepage');  // Just to check 
})

app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log('Connected to the DB');
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.port}`);
})