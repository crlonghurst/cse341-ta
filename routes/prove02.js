const express = require('express');
const fs = require('fs'); 
const router = express.Router();
const bodyParser = require('body-parser'); 
// const jsonfile = require('jsonfile');    

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
/*The code I am using for writing and reading from a file was based off of this stackoverflow post https://stackoverflow.com/questions/45237999/save-html-form-data-in-json-format-in-a-json-file-using-node-and-express-with-j */


//const file = '../public/data/bookData.json'



router.post('/books', (req,res,next)=>{
    
    if(req.body.bookTitle == ''){
        res.redirect('/prove02');
    }
    else if(req.body.bookDesc == ''){
        res.redirect('/prove02');
    }
    else{
        /*const obj = { bookTitle: req.body.bookTitle , desc: req.body.bookDesc, releasedDate: req.body.releaseDate }

        
        const jsonData = fs.readFileSync(file)

        
        const bookList = JSON.parse(jsonData);
        
        bookList.push(obj);

        fs.writeFileSync(file, JSON.stringify(bookList));


        console.log(bookList)
        let bookObj = [];
        for(book in bookList){
            bookObj.push(book)
            
        }
        const newBookList = fs.readFileSync(file)*/

        res.render('pages/bookDisplay.ejs',{
            title: 'Prove 02: Books',
            path: '/prove02/books',
            //bookList: bookObj,
            bookTitle: req.body.bookTitle,
            bookDesc: req.body.bookDesc,
            releaseDate: req.body.releaseDate,
            contentCSS: true,
        })
    }
});

router.get('/', (req, res, next) => {
    res.render('pages/prove02.ejs',{
        title: 'Prove 02',
        path: '/',
        contentCSS: true,
    })
    return res.end(); // Return so you don't execute remaining code outside of if statement
});

module.exports = router;