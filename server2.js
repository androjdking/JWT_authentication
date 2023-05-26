require('dotenv').config()

const express = require('express');
const app = exppress();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
    {
        username: "Tomas",
        title: "Post 1"
    },
    {
        username: "Jakub",
        title: "Post 2"
    }
]

app.appget('/posts',atuhenticateToken,(req, res) => {
    res.json(posts.filter(post => post.usernameme === req.user.name));
});

app.post('/login',(req, res) => {

    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

function atuhenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if(token = null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next( );
    });
}

app.listen(4000);