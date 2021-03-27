const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/prove12/', (req, res, next) => {
    res.render('../views/pages/prove12-login', {
        title: 'Prove Activity 12',
        path: '/prove12'
    })
})

// Verify login submission to access chat room.
router.post('/prove12/login', (req, res, next) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    const {username} = req.body;
    if (!username || username.trim() === '')
        return res.status(400).send({ error: 'Username cannot be empty!' })
    if(users.includes(username.trim())){
        return res.status(409).send({ error: 'Username is taken!'})
    }
    else{
        users.push = username.trim();
        req.session.user = username;
        res.status(200).send({username: username.trim()})
    }
})

// Render chat screen.
router.get('/prove12/chat', (req, res, next) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    res.render('../views/pages/prove12-chat', {
        title: 'Prove Assignment 12 Chat-room',
        path: '/prove12/chat',
        user: req.session.user
    })
})

module.exports = router
