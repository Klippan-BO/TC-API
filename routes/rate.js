const router = require('express').Router();
const rate = require('../models/rate');

router.get('/get', (req, res) => {
  console.log('[routes] request to get ratings');
  rate.getRatings()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('[routes] Error getting ratings:');
      res.status(500).send('failed');
    });
})

router.post('/add', (req, res) => {
  console.log('[routes] request to add ratings');
  rate.addRatings(req.body)
    .then((data) => {
      console.log(data)
      res.send(data);
    })
    .catch((err) => {
      console.log('[routes] Error adding ratings:');
      res.status(500).send('failed');
    })
})

module.exports = router;