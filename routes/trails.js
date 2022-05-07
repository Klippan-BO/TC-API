const router = require('express').Router();
const db = require('../models');

router.get('/:trailId', (req, res) => {
  console.log('get trail from db');
  res.send('getting trail');
});

module.exports = router;
