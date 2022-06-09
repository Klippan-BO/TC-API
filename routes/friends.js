const router = require('express').Router();
const { friends } = require('../models');

router.post('/add', (req, res) => {
  const { userId, friendId } = req.body;
  console.log('[routes] incoming friend request:', req.body);
  friends.add(userId, friendId)
    .then((friendship) => {
      res.send(friendship);
    })
    .catch((err) => {
      console.log('[routes] Error with friendship creation', err);
      res.status(500).send(err);
    });
});

router.post('/request', (req, res) => {
  const { from, to } = req.query;
  console.log(`[routes] incoming friend request from ${from} to ${to}`);
  friends.add(from, to)
    .then((friendship) => {
      res.send(friendship);
    })
    .catch((err) => {
      console.log('[routes] error creating friendship:', err);
      res.status(500).send(err);
    });
});

router.get('/:friendId/status', (req, res) => {
  const { userId } = req.query;
  const { friendId } = req.params;
  console.log('[routes] Request for friend status:', req.query);
  friends.getStatus(userId, friendId)
    .then((status) => {
      res.send(status);
    })
    .catch((err) => {
      console.log('[routes] error with status:', err);
      res.status(404).send(err);
    });
});

router.delete('/:friendshipId/reject', (req, res) => {
  const { friendshipId } = req.params;
  console.log('[routes] friend request rejection:', friendshipId);
  friends.reject(friendshipId)
    .then((result) => {
      const friendship = result;
      friendship.status = 'deleted';
      console.log('[route] friendship updated:', friendship);
      res.send(friendship);
    })
    .catch((err) => {
      console.log('[routes] Error with friendship acceptance', err);
      res.status(500).send(err);
    });
});

module.exports = router;
