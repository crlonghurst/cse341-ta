const express = require('express')
const router = express.Router()


// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../public/data/prove10.json')

router.get('/prove11/fetchAll', (req, res, next) => {
    res.json(dummyData)
})

router.post('/prove11/insertName', (req, res, next) => {
    // Typically you should do some sort of filtering and error checking. This is minimal, and makes sure we're not accepting empty values
    if (req.body.newName !== undefined) {
        const newName = req.body.newName
        const newPower = req.body.power
        if (
            dummyData.avengers.find(
                element => element.name === req.body.newName
            ) === undefined
        ) { // Make our submissions somewhat unique.
            dummyData.avengers.push({ name: newName, power: newPower }) // Push new object into the dummyData
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) // Bad request error code
    }
})

router.get('/prove11', (req, res, next) => {
    res.render('../views/pages/prove11.ejs', {
        title: 'Prove Assignment 11',
        path: '/prove11'
    })
})


module.exports = router