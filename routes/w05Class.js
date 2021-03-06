const Customer = require('../models/customer');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');

/* 
TASKS 
  1. Integrate all of the code in the provided zip folder into a node project
  2. Fix errors and bugs so that you can successfully run the project
  3. Successfully connect to MongoDB (connection will be made in a different file) and work with new Customer model
  4. Work with cookies
        Create a cookie and practice modifying it
        Use Chrome developer tools to verify the cookie's existence and the data in it.
        Delete it
  5. Run the application with the authentication code so that a user needs to log in before they see/do something of your choosing.
  6. Have fun!
*/

// COOKIES!!!
//JSON object to be added to cookie 
let users = { 
   firstName : "Christian", 
   lastName: "Longhurst"
} 
router.get('/setuser', (req, res)=>{ 
   res.cookie("userData", users); 
   res.send('user data added to cookie'); 
}); 
router.get('/getuser', (req, res)=>{ 
   res.send(req.cookies); 
}); 

router.use(session({secret: 'anything'}))

// Authentication
router.get('/signup', (req, res)=> {
   res.render('pages/classActivities/signup', {
      title: "Class Login Activity",
      path: "w05Class"
  });
});
router.post('/signup', (req, res)=> {
   const email = req.body.email;
   const password = req.body.password;
   const confirmPassword = req.body.confirmPassword;
   Customer.findOne({ email: email })
   .then(customerDoc => {
     if (customerDoc) {
       return res.redirect('/classActivities/signup');
     }
     return bcrypt.hash(password, 12);
   })
   .then(hashedPassword => {
     const customer = new Customer({
       email: email,
       password: hashedPassword
     });
     return customer.save();
   })
   .then(result => {
     res.redirect('/classActivities/login');
   })
   .catch(err => {
     console.log(err);
   });
});
router.get('/login', (req, res)=> {
   res.render('/pages/classActivities/login', {
      title: "Class Login Activity",
      path: "w05Class"
  });
});
router.post('/login', (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   Customer.findOne({ email: email })
     .then((customer) => {
       if (!customer) {
         return res.redirect("/classActivities/login");
       }
       bcrypt
         .compare(password, customer.password)
         .then(match => {
           if(match) {
             req.session.customer = customer;
             res.render('pages/classActivities/index', {
               title: "Week 5 Class Activity",
               path: "w05Class",
               customer: req.session.customer
             });
           } else {
              return res.redirect('/classActivities/index');
           }
         })
         .catch((err) => {
           console.log(err);
           res.redirect("/classActivities/login");
         });
     })
     .catch((err) => console.log(err));
});

router.get('/signout', (req, res)=> {
   req.session.customer = null
   res.redirect('/classActivities/index');
});
// home
router.get('/', (req, res) => {
   res.render('pages/classActivities/index', {
      title: "Week 5 Class Activity",
      path: "w05Class",
      customer:null
  });
})
module.exports = router;