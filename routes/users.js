const router = require('express').Router();
const { users } = require('../models');

router.get('/me', (req, res) => {
  // Gets user profile using session ID
  console.log('[routes] request to get current users full user profile');
  const session = req.cookies['trail-comp'];
  const userId = req.cookies['trail-comp-user'];
  if (!session) {
    res.status(404).send('user not logged in!');
  } else {
    users.getAuthorizedUserProfile(userId)
      .then((user) => {
        console.log('[routes] Sending back full user profile');
        res.send(user);
      })
      .catch((err) => {
        console.log('[routes] Error getting full user profile:', err);
      });
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

// Built-in redundancy: (we can twease this out later. . or not)
router.post('/login', (req, res) => {
  const session = req.cookies['trail-comp'];
  const user = req.body;
  console.log('[routes] login request from user:', user, session);
  if (session) {
    res.send('User logged in');
  } else {
    users.login(user)
      .then(([userId, newCookie]) => {
        // After login -> set new cookie named "trail-comp" to session ID recorded in DB:
        res.cookie('trail-comp', newCookie);
        // Attach another cookie with the userId for faster loading of the profile later:
        res.cookie('trail-comp-user', userId);
        // Send back user_id just for robustness:
        res.send(userId);
      })
      .catch((err) => {
        console.log('[routes] Issue logging in user:', err);
      });
  }
});
// users.login (user) => [userId, cookie]

module.exports = router;
