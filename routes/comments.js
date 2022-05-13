const router = require('express').Router();
const comments = require('../models/comments');

router.post('/add', (req, res) => {
  console.log('[routes] posting new comment:', req.body.comment);
  comments.addComment(req.body.comment)
    .then((newComment) => {
      res.status(204).send(newComment);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put('/:id/upvote', (req, res) => {
  console.log('[routes] upvoting comment:', req.params.id);
  comments.upvoteComment(req.params.id)
    .then(res.send(204))
    .catch((err) => {
      console.log('[routes] issue upvoting comment:', err);
    });
});

module.exports = router;
