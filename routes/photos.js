const router = require('express').Router();
const photos = require('../models/photos');

router.put('/:id/upvote', (req, res) => {
  console.log('[routes] upvoting photo:', req.params.id);
  photos.upvotePhoto(req.params.id)
    .then(res.send(204))
    .catch((err) => {
      console.log('[routes] issue upvoting photo:', err);
    });
});

module.exports = router;
