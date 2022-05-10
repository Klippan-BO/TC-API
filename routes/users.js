const router = require('express').Router();
const { users } = require('../models');

routes.get('/me', (req, res) => {
  // Gets user profile using session ID
  console.log('[routes] request to get current users full user profile');
  const session = req.cookies['trail-comp'];
  if (!session) {
    res.status(404).send('user not logged in!');
  } else {
    users.getFullUserBySession(session)
  }
});

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
  const session = req.cookies['trail-comp'];
  const user = req.body;
  console.log('[routes] login request from user:', user, session);
  if (session) {
    res.send('User logged in');
  } else {
    users.login(user)
      .then(([userId, newCookie]) => {
        // After login -> set new cookie named "trail-comp" to session ID recorded in DB
        res.cookie('trail-comp', newCookie).send(userId);
      })
      .catch((err) => {
        console.log('[routes] Issue logging in user:', err);
      });
  }
});
// users.login (user) => [userId, cookie]

module.exports = router;
