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

router.post('/add', (req, res) => {
  const trail = req.body;
  console.log('[routes] request to add new trail:', trail);
  trails.createTrail(trail)
    .then((newTrail) => {
      res.send(newTrail);
    })
    .catch((err) => {
      console.log('[routes] Error creating trail:', err);
      res.status(500).send('failed');
    });
});

router.post('/rate', (req, res) => {
  const ratings = req.body;
  console.log('[routes] request to rate trail:', trail);
  trails.rate(ratings)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('[routes] Error rating trail:', err);
      res.status(500).send('failed');
    });
});

module.exports = router;
