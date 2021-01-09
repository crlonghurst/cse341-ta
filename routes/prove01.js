const express = require('express');
const fs = require('fs'); 
const router = express.Router();
const bodyParser = require('body-parser'); 


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post('/studentForm', (req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const subject = req.body.subject;
    const professor = req.body.professor;

    if(firstName == null){
        res.render('pages/prove01.ejs',{
            tite: 'Prove 01',
            path: 'prove01',
            error: 'You need to provide a first name',
            contentCSS: true,
        })
    }
    else if(lastName == null){
        res.render('pages/prove01.ejs',{
            tite: 'Prove 01',
            path: 'prove01',
            error: 'You need to provide a last name',
            contentCSS: true,
        })
    }
    else if(subject == null){
        res.render('pages/prove01.ejs',{
            tite: 'Prove 01',
            path: 'prove01',
            error: 'You need to provide a subject',
            contentCSS: true,
        })
    }
    else if (professor == null){
        res.render('pages/prove01.ejs',{
            tite: 'Prove 01',
            path: 'prove01',
            error: 'You need to provide a Professor',
            contentCSS: true,
        })
    }
    else{
        res.render('pages/proveRes.ejs',{
            title: 'Prove 01 response',
            path: 'studentForm',
            fName: firstName,
            lName: lastName,
            subject: subject,
            teacher: professor,
            contentCSS: true,
        })
    }
});


router.get('/', (req, res, next) => {
    res.render('pages/prove01.ejs',{
        title: 'Prove 01',
        path: 'prove01',
        error: '',
        contentCSS: true,
    })
    return res.end(); // Return so you don't execute remaining code outside of if statement
});



module.exports = router;