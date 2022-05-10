const router = require('express').Router();
const { trails } = require('../models');

router.get('/:trailId', (req, res) => {
  console.log('[trails] get trail from trails model');
  trails.getTrailById(req.params.trailId)
    .then((trail) => {
      res.send(trail);
    });
});

module.exports = router;
