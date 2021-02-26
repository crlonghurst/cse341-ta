//TA04 PLACEHOLDER
const express = require('express');
const session = require('express-session');
const router = express.Router();

router.use(session({ secret: 'user1234566789' }))

router.post('/change-style', (req, res, next) => {
    req.session.style = req.body.color;
    res.redirect('/ta05');
});


router.post('/counter', (req, res, next) => {
    let value = parseInt(req.body.counter);
    req.session.counter += value;
    res.redirect('/ta05');
});

router.post('/reset', (req, res, next) => {

    req.session.destroy();
    res.redirect('/ta05');
});

router.get('/', (req, res, next) => {
    let style = req.session.style
    let counter = req.session.counter
    if (!counter) {
        counter = 0;
        req.session.counter = counter;
    }
    if (!style) {
        style = "green";
        req.session.style = style;
    }


    res.render('pages/ta05', {
        title: 'Team Activity 05',
        path: '/ta05', // For pug, EJS 
        activeTA04: true, // For HBS
        contentCSS: true, // For HBS
        style: req.session.style,
        counter: parseInt(req.session.counter)
    });
});


module.exports = router;