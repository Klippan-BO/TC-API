const router = require('express').Router();
const trails = require('./trails');
const users = require('./users');
const photos = require('./photos');
const comments = require('./comments');
const activity = require('./activity');
const friends = require('./friends');

router.use('/trails', trails);

router.use('/users', users);

router.use('/photos', photos);

router.use('/comments', comments);

router.use('/activity', activity);

router.use('/friends', friends);

module.exports = router;
