const router = require('express').Router();
const trails = require('./trails');
const users = require('./users');

router.use('/trails', trails);

router.use('/users', users);

// data = { zip: 94010 , radius: 25 }
module.exports = router;
