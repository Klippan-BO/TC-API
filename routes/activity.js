const router = require('express').Router();
const { activity } = require('../models');

// "activity" object to post -> { trailId: 5 [,userId: 99] }
router.post('/add', (req, res) => {
  const userId = req.cookies['trail-comp-user'] || req.body.userId;
  const { trailId } = req.body;
  console.log(`[routes] user activity posted: user-cookie: ${userId}, activity: ${req.body}`);
  activity.addUserActivity(userId, trailId)
    .then((userActivity) => {
      res.send(userActivity);
    })
    .catch((err) => {
      console.log('[routes] Error with adding user activity:', err);
    });
});

module.exports = router;
