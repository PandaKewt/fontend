const express = require('express');
const router = express.Router();

const podcastRouter = require('./api/podcast');
const userRouter = require('./api/user');
const questionRouter = require('./api/question');

router.use('/podcast', podcastRouter);
router.use('/user', userRouter);
router.use('/question', questionRouter);

module.exports = router;
