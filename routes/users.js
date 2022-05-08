const router = require('express').Router();
const { users } = require('../models');

router.get('/:userId', (req, res) => {
  console.log('[routes] get trail from trails model');
  users.getUserById(req.params.userId)
    .then((user) => {
      res.send(user);
    });
});

module.exports = router;
