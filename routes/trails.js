const router = require('express').Router();
const { trails } = require('../models');

router.get('/map', (req, res) => {
  const coords = req.query;
  console.log('[routes] gettings trails in-bounds:', coords);
  trails.getTrailsInBounds(coords)
    .then((trailList) => {
      res.send(trailList);
    })
    .catch((err) => {
      console.log('[routes] issue getting trails in bounds:', err);
    });
});

router.get('/:trailId', (req, res) => {
  console.log('[routes] get trail from trails model');
  trails.getTrailById(req.params.trailId)
    .then((trail) => {
      res.send(trail);
    });
});

module.exports = router;
