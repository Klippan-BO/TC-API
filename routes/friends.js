const router = require('express').Router();
const { friends } = require('../models');

router.post('/add', (req, res) => {
  const { userId, friendId } = req.body;
  console.log('[routes] incoming friend request:', req.body);
  friends.sendFriendRequest(userId, friendId)
    .then((friendship) => {
      res.send(friendship);
    })
    .catch((err) => {
      console.log('[routes] Error with friendship acceptance', err);
      res.status(500).send(err);
    });
});

router.put('/accept', (req, res) => {
  const { userId, friendId, friendshipId } = req.body;
  console.log('[routes] friend request acceptance:', req.body);
  friends.acceptFriendRequest(userId, friendId, friendshipId)
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
