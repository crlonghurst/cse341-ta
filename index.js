const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const prove01 = require('./routes/prove01');
const prove02 = require('./routes/prove02');
const w05Class = require('./routes/w05Class');
const ta05routes = require('./routes/ta05');
const prove08 = require('./routes/prove08');
const prove09 = require('./routes/prove09');
const prove10 = require('./routes/prove10');
const prove11 = require('./routes/prove11');

const server = app.listen(PORT);

const io = require('socket.io')(server)



app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('/scripts', path.join(__dirname, 'public/scripts'))
   .set('/data', path.join(__dirname, 'public/data'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/prove01', prove01)
   .use('/prove02', prove02)
   .use('/w05Class', w05Class)
   .use('/ta05',ta05routes)
   .use(prove08)
   .use(prove09)
   .use(prove10)
   .use(prove11)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })


   io.on('connection', socket =>{
    console.log('Client connected')
    socket.on('new-name', update =>{
      console.log("Got to the emit")
      if(update){

        console.log(update);
        socket.broadcast.emit('update-list')
      }
      else{
        console.log('Looks like something went wrong');
      }
    })
  })
