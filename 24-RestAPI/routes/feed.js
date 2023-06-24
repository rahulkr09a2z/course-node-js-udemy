const express = require('express');

const router = express.router;

const feedController = require('../controllers/feed')

router.get('/posts',feedController.getPosts);

module.exports = router;