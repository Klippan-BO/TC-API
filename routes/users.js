const router = require('express').Router();
const { users } = require('../models');

router.get('/:userId', (req, res) => {
  console.log('[routes] get user from users model');
  users.getUserProfileById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log('[routes] Issue getting user by id:', err);
    });
});

router.post('/login', (req, res) => {
  const cookie = req.cookies['trail-comp'];
  const user = req.body;
  console.log('[routes] login request from user:', user, cookie);
  if (cookie) {
    res.send('User logged in');
  } else {
    users.login(user)
      .then(([userId, newCookie]) => {
        res.cookie(newCookie).send(userId);
      })
      .catch((err) => {
        console.log('[routes] Issue logging in user:', err);
      });
  }
});

// users.login (user) => [userId, cookie]

module.exports = router;
