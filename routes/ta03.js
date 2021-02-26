//TA03 PLACEHOLDER
const express = require('express');

const fs = require('fs');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/search', (req, res, next) => {
    const tag = req.body.tag; //Should be a string, maybe need to JSON parse?
    const url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
    const products = [];
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            if (products != null) {
                out.forEach(data => {
                    products.push(data)
                })
            }
            console.log(products[0]);
            const tagProducts = products.filter((product) => {
                //Search for tag in a product's tag and add if found
                return product.tags.includes(tag);
            });
            res.render('../views/pages/ta03.ejs', {
                title: 'Team ACtivity 03',
                path: '/ta03',
                productList: tagProducts,
            });
        })
        .catch(err => { throw err });


});

router.get('/', (req, res, next) => {
    const url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

    const products = [];
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            if (products != null) {
                out.forEach(data => {
                    products.push(data)
                })
            }
            console.log(products)
            res.render('../views/pages/ta03.ejs', {
                title: 'Team Activity 03',
                path: '/ta03', // For pug, EJS 
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS
                productList: products,
            });

        })
        .catch(err => { throw err });
    // console.log(products)
    // res.render('pages/teamActivities/ta03', {
    //     title: 'Team Activity 03',
    //     path: '/ta03', // For pug, EJS 
    //     activeTA03: true, // For HBS
    //     contentCSS: true, // For HBS
    //     productList: products,
    // });
});



module.exports = router;