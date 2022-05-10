const router = require('express').Router();
const { trails } = require('../models');

router.get('/:trailId', (req, res) => {
  console.log('[routes] get trail from trails model');
  trails.getTrailById(req.params.trailId)
    .then((trail) => {
      res.send(trail);
    });
});

router.post('/map', (req, res) => {
  const coords = req.body;
  trails.getTrailsInBounds(coords)
    .then((trailList) => {
      console.log('[routes] gettings trails in-bounds:', coords);
      res.send(trailList);
    })
    .catch((err) => {
      console.log('[routes] issue getting trails in bounds:', err);
    });
});

module.exports = router;
