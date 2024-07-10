const express = require('express');
const router = express.Router();
const { getData, insertData } = require('../controllers/dataController');

router.get('/', getData);
router.post('/', insertData);

module.exports = router;