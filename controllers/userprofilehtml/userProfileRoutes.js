const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');
const express = require('express');

const router = express.Router();

router.get('/user-profile', checkAuthenticated, async (req, res) => {
  const user = await req.user;
  console.log(user);

  res.render('user-profile', { ...user });
});

module.exports = router;
