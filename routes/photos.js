const router = require('express').Router();
const photos = require('../models/photos');

router.put('/:id/upvote', (req, res) => {
  console.log('[routes] upvoting photo:', req.params);
  photos.upvotePhoto(req.params.id)
    .then(res.send(204))
    .catch((err) => {
      console.log('[routes] issue upvoting photo:', err);
    });
});

router.get('/test', (req, res) => {
  console.log('im here in test');
  res.send('hello World');
});

router.post('/', (req, res) => {
  photos.insertPhoto(req.body);
  res.send('hello from photos post');
});

module.exports = router;
