const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');
const express = require('express');

const router = express.Router();

router.get('/user-profile', checkAuthenticated, async (req, res) => {
  const user = await req.user;
  const data = {
    displayName: user.fullName,
    nickname: user.nickname,
    uniqueIdentifier: user.uniqueIdentifier,
  };
  res.render('user-profile', data);
});
module.exports = router;
