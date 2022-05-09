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
  console.log('[routes] login from user:', req.body.email);
  users.loginByEmail(req.body.email)
    .then((user) => {
      res.send(user.id);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
