const router = require('express').Router();
const trails = require('./trails');
const users = require('./users');
const photos = require('./photos');
const comments = require('./comments');

router.use('/trails', trails);

router.use('/users', users);

router.use('/photos', photos);

router.use('/comments', comments);

module.exports = router;
