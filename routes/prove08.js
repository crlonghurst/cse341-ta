const express = require('express');
const router = express.Router();

var jsonEngine = require('../controllers/prove08');

router.get('/prove08', jsonEngine.processJson)
router.post('/prove08', jsonEngine.getIndex);

   
module.exports = router;