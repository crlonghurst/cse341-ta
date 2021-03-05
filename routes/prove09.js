const express = require('express');
const router = express.Router();

var jsonEngine = require('../controllers/prove09');

router.get('/prove09', jsonEngine.processJson)
router.post('/prove09/add', jsonEngine.getNext10);
router.post('/prove09/sub', jsonEngine.getLast10);

   
module.exports = router;