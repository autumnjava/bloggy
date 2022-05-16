const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };

    }

    if (type === 'CommentCreated') {
        const {id, content, postId} = data;

        const post = posts[postId];
        const newComment = { id, content };
        post.comments.push(newComment);
    }
}

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);
    
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on port 4002 - query service');
        try{

        const res = await axios.get('http://event-bus-srv:4005/events');
        for (let event of res.data){
            console.log('processing event', event.type);
            handleEvent(event.type, event.data);
        } 
    } catch (error){
        console.log(error.message);
    }

})