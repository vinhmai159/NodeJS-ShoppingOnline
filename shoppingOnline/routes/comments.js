const express = require('express');
const router = express.Router();
const CommentControllers = require('../controllers/comments');

router.route('/')
        .post(CommentControllers.comment);

module.exports = router;