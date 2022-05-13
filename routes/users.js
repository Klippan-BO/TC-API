const router = require('express').Router();
const { users, friends } = require('../models');

router.get('/me', (req, res) => {
  // Gets user profile using cookie
  // Currently does not authenticate the user by comparing the session id
  // Only checks if the cookie exists
  const { userId } = req.query;
  // const session = req.cookies['trail-comp'];
  // const userId = req.cookies['trail-comp-user'];
  console.log('[routes] request to get current users full user profile');
  users.getAuthorizedUserProfile(userId)
    .then((user) => {
      console.log('[routes] Sending back full user profile');
      res.send(user);
    })
    .catch((err) => {
      console.log('[routes] Error getting full user profile:', err);
    });
});

router.get('/:userId/friends', (req, res) => {
  const { userId } = req.params;
  console.log('requesting friend info for:', req.params);
  friends.getFriendsByUserId(userId)
    .then((friendList) => {
      res.send(friendList);
    })
    .catch((err) => {
      console.log('[routes] error getting friends list:', err);
      res.status(500).send(err);
    });
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

router.post('/signup', (req, res) => {
  const user = req.body;
  console.log('[routes] sign-up request from user:', user);
  users.signup(user)
    .then((userSession) => {
      res.cookie('trail-comp', userSession.session_id);
      res.cookie('trail-comp-user', userSession.id);
      res.send(userSession);
    })
    .catch((err) => {
      console.log('[routes] error with sign-up', err);
      res.status(500).send('[TC-API] Issues with sign-up');
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
      .then((userSession) => {
        res.cookie('trail-comp', userSession.session_id);
        res.cookie('trail-comp-user', userSession.id);
        res.send(userSession);
      })
      .catch((err) => {
        console.log('[routes] Issue logging in user:', err);
        res.status(404).send('[TC-API] User not found!');
      });
  }
});

router.delete('/:userId', (req, res) => {
  console.log('[routes] request to delete user:', req.params.userId);
  users.deleteUser(req.params.userId)
    .then((update) => {
      console.log(update);
      res.status(204).send(update);
    })
    .catch((err) => {
      console.log('[route] delete error', err);
      res.status(404).send(err);
    });
});

module.exports = router;
