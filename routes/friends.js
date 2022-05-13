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

router.get('/status', (req, res) => {
  const { userId, friendId } = req.query;
  console.log('[routes] Request for friend status:', req.query);
  friends.checkFriendStatus(userId, friendId)
    .then((status) => {
      res.send(status)
    })
    .catch((err) => {
      console.log('[routes] error with status:', err);
      res.status(404).send(err);
    });
})

router.delete(':friendshipId/reject', (req, res) => {
  const friendshipId = req.params.friendshipId;
  console.log('[routes] friend request acceptance:', req.body, 'reject:', friendshipId);
  friends.reject(friendshipId)
    .then((friendship) => {
      console.log('[route] friendship updated:', friendship);
      res.send(friendship);
    })
    .catch((err) => {
      console.log('[routes] Error with friendship acceptance', err);
      res.status(500).send(err);
    });
});

router.put('/reject', (req, res) => {
  const { userId, friendId, friendshipId } = req.body;
  console.log('[routes] friend request rejection:', req.body);
  friends.rejectFriendRequest(userId, friendId, friendshipId)
    .then((friendship) => {
      console.log('[route] friendship updated:', friendship);
      res.send(friendship);
    })
    .catch((err) => {
      console.log('[routes] Error rejecting friendship', err);
      res.status(500).send(err);
    })
})

module.exports = router;
