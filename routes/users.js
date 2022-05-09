const router = require('express').Router();
const { users } = require('../models');

router.get('/:userId', (req, res) => {
  console.log('[routes] get trail from trails model');
  users.getUserById(req.params.userId)
    .then((user) => {
      res.send(user);
    });
});

router.post('/login', (req, res) => {
  console.log('[routes] login request from user:', req.body);
  users.login(req.body)
    .then((userId) => {
      res.send(userId);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
