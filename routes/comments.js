const router = require('express').Router();
const comments = require('../models/comments');

router.put('/:id/upvote', (req, res) => {
  console.log('[routes] upvoting comment:', req.params.id);
  comments.upvoteComment(req.params.id)
    .then(res.send(204))
    .catch((err) => {
      console.log('[routes] issue upvoting comment:', err);
    });
});

module.exports = router;
