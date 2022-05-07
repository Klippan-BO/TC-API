const router = require('express').Router();
const trails = require('./trails');
const users = require('./users');

router.get('/trails/:trailId', trails);

router.get('users/:userId', users);

// data = { zip: 94010 , radius: 25 }
module.exports = router;
