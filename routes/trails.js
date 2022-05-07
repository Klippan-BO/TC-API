const router = require('express').Router();
const db = require('../models');

router.get('/:trailId', (req, res) => {
  console.log('get trail from db');
  db.getTrailById(req.params.trailId)
    .then((trail) => {
      res.send(trail);
    });
});

module.exports = router;
