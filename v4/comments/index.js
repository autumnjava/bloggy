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

app.post('/posts/:id/comments', async (req, res) => {
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

    // Send event to Event-Bus service
    const event = {
        type: 'CommentCreated',
        data: {...newComment, postId}
    };
    await axios.post('http://event-bus-srv:4005/events', event);

    res.status(201).send(newComment);
});

app.post('/events', (req, res) => {
    console.log(req.body.type, 'received event');
    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on port 4001 - comments service');
})