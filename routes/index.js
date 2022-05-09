const router = require('express').Router();
const trails = require('./trails');
const users = require('./users');

router.use('/trails', trails);

router.use('/users', users);

// router.get('/', (req, res) => {
//   console.log('[routes] request cookies:', req.cookies);
//   res.send(req.cookies);
// });

module.exports = router;
