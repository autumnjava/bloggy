const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id, title
    };

    // Send event to Event-Bus service
    const event = {
        type: 'PostCreated',
        data: {
            id, title
        }
    };
    await axios.post('http://localhost:4005/events', event);

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log(req.body.type, 'received event');
    res.send({});
})

app.listen(4000, () => {
    console.log('Listening on port 4000 - posts service');
})