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
  console.log('[routes] request to post photo:', req.body);
  photos.insertPhoto(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:trail_id', (req, res) => {
  photos.getPhotos(req.params.trail_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // res.send({ message: `im back u looking for photos of ${req.params.trail_id}?` });
});

module.exports = router;
