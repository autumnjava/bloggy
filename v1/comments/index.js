const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;

    res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const { content } = req.body;

    const comments = commentsByPostId[postId] || [];

    const newComment = {
        id: commentId,
        content
    }
    
    comments.push(newComment);

    commentsByPostId[postId] = comments;

    res.status(201).send(newComment);
});


app.listen(4001, () => {
    console.log('listening on port 4001 - comments service');
})